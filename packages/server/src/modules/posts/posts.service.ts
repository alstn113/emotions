import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Post, PostLike } from '@prisma/client';
import { AppErrorException } from '../../common/exceptions';
import { generateId, slugify } from '../../lib/slugify';
import { S3Service } from '../../providers/aws/s3/s3.service';
import { CommentsService } from '../comments/comments.service';
import { SeriesService } from '../series/series.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsQueryDto } from './dto/get-post-query.dto';
import { PostsRepository } from './posts.repository';
import removeMarkdown from 'remove-markdown';
import { GetSearchPostsQueryDto } from './dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly commentsService: CommentsService,
    private readonly seriesService: SeriesService,
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
  ) {}
  async getPosts(dto: GetPostsQueryDto, userId: string | null) {
    const { totalCount, endCursor, hasNextPage, list } =
      await this.postRepository.findPosts(dto.cursor, userId);

    const serializedList = list.map((post) => this.serializePost(post));

    return {
      list: serializedList,
      totalCount,
      pageInfo: {
        endCursor: hasNextPage ? endCursor : null,
        hasNextPage,
      },
    };
  }

  async getPostsByUsername(
    dto: GetPostsQueryDto,
    username: string,
    userId: string | null,
  ) {
    const { totalCount, endCursor, hasNextPage, list } =
      await this.postRepository.findPosts(dto.cursor, userId, username);

    const serializedList = list.map((post) => this.serializePost(post));

    return {
      list: serializedList,
      totalCount,
      pageInfo: {
        endCursor: hasNextPage ? endCursor : null,
        hasNextPage,
      },
    };
  }

  async getPostBySlug({ username, slug, userId }: GetPostParams) {
    const post = await this.postRepository.findPostBySlug(
      username,
      slug,
      userId,
    );
    if (!post) throw new AppErrorException('NotFound', 'Post not found');

    const series = await this.seriesService.getSeriesByPostId(post.id);

    return this.serializePost({ ...post, series });
  }

  async getPost(id: string, userId: string | null = null) {
    const post = await this.postRepository.findPostById(id, userId);
    if (!post) throw new AppErrorException('NotFound', 'Post not found');

    const series = await this.seriesService.getSeriesByPostId(id);

    return this.serializePost({ ...post, series });
  }

  async getSearchPosts(dto: GetSearchPostsQueryDto) {
    const posts = await this.postRepository.findSearchPosts(dto);
    const serializedList = posts.map((post) => this.serializePost(post));

    return {
      posts: serializedList,
      count: serializedList.length,
    };
  }

  async createPost(
    dto: CreatePostDto,
    user: { userId: string; username: string },
  ) {
    // slug duplicate check
    let slug = dto.slug ? slugify(dto.slug) : slugify(dto.title);
    const isSameSlugExists = await this.postRepository.findPostBySlug(
      user.username,
      slug,
    );
    if (isSameSlugExists) {
      slug += `-${generateId()}`;
    }

    // description
    let description = dto.description;
    if (!dto.description) {
      description = removeMarkdown(dto.body);
    }

    description =
      description.slice(0, 200) + (description.length > 200 ? '...' : '');

    // create post
    const post = await this.postRepository.createPost(
      dto,
      slug,
      description,
      user.userId,
    );

    // if seriesId is provided, add post to series
    if (dto.seriesId) {
      await this.seriesService.appendPostToSeries(
        dto.seriesId,
        post.id,
        user.userId,
      );
    }

    const postStats = await this.postRepository.createPostStats(post.id);

    const postWithStats = { ...post, postStats };

    return this.serializePost(postWithStats);
  }

  private serializePost<
    T extends Post & {
      postLikes?: PostLike[];
      tags: {
        tag: {
          name: string;
        };
      }[];
    },
  >(post: T) {
    const serializedPost = {
      ...post,
      isLiked: !!post.postLikes?.length,
      tags: post.tags.map((t) => t.tag.name),
    };

    delete serializedPost.postLikes;

    return serializedPost;
  }

  async likePost({ userId, postId }: PostActionParams) {
    const alreadyLiked = await this.postRepository.findPostLike(postId, userId);
    if (!alreadyLiked) {
      await this.postRepository.createPostLike(postId, userId);
    }
    const postStats = await this.updatePostLikes(postId);
    return postStats;
  }

  async unlikePost({ userId, postId }: PostActionParams) {
    const alreadyLiked = await this.postRepository.findPostLike(postId, userId);
    if (alreadyLiked) {
      await this.postRepository.deletePostLike(postId, userId);
    }

    const postStats = await this.updatePostLikes(postId);
    return postStats;
  }

  async updatePostLikes(postId: string) {
    const likes = await this.postRepository.countPostLikes(postId);
    const postStats = await this.postRepository.updatePostLikes(postId, likes);

    return postStats;
  }

  async deletePost({ userId, postId }: PostActionParams) {
    // check if post exists
    const post = await this.getPost(postId);

    // check if user is the author
    if (post.userId !== userId)
      throw new AppErrorException('Forbidden', 'You are not the author');

    // if post is in series, subtract index after the post
    const seriesPost = await this.seriesService.getSeriesPostByPostId(postId);

    if (seriesPost) {
      await this.seriesService.subtractIndexAfter(
        seriesPost.seriesId,
        seriesPost.index,
      );
    }

    // delete image
    if (post.thumbnail) await this.deleteImage(post.thumbnail);
    await this.postRepository.deletePost(postId);
  }

  async getCommentList(postId: string, userId: string | null) {
    const comments = await this.commentsService.getComments(postId, userId);
    const postStats = await this.postRepository.getPostStats(postId);
    return { list: comments, totalCount: postStats.commentsCount };
  }

  async uploadImage(image: Express.Multer.File) {
    const filename = `${Date.now()}-${image.originalname}`;
    const bucket = this.configService.get<string>('AWS_S3_BUCKET');
    await this.s3Service.pubObject(filename, image);
    return `https://${bucket}.s3.amazonaws.com/${filename}`;
  }

  async deleteImage(thumbnail: string) {
    const bucket = this.configService.get<string>('AWS_S3_BUCKET');
    const filename = thumbnail.replace(
      `https://${bucket}.s3.amazonaws.com/`,
      '',
    );
    await this.s3Service.deleteObject(filename);
    return filename;
  }
}

interface GetPostParams {
  username: string;
  slug: string;
  userId: string | null;
}

interface PostActionParams {
  userId: string;
  postId: string;
}
