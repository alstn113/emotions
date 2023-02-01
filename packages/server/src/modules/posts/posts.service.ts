import { HttpException, Injectable } from '@nestjs/common';
import { Post, PostLike } from '@prisma/client';
import { CommentsService } from '../comments/comments.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly commentsService: CommentsService,
  ) {}
  async getPosts() {
    return await this.postRepository.findPosts();
  }

  async getPost(id: string, userId: string | null = null) {
    const post = await this.postRepository.findPostById(id, userId);
    if (!post) throw new HttpException('Post not found', 404);
    return this.serializePost(post);
  }

  async createPost(dto: CreatePostDto, userId: string) {
    const post = await this.postRepository.createPost(dto, userId);
    const postStats = await this.postRepository.createPostStats(post.id);

    const postWithStats = { ...post, postStats };

    return this.serializePost(postWithStats);
  }

  private serializePost<T extends Post & { postLikes?: PostLike[] }>(post: T) {
    const serializedPost = {
      ...post,
      isLiked: !!post.postLikes?.length,
    };
    delete serializedPost.postLikes;

    return serializedPost;
  }

  async likePost(postId: string, userId: string) {
    const alreadyLiked = await this.postRepository.findPostLike(postId, userId);
    if (!alreadyLiked) {
      await this.postRepository.createPostLike(postId, userId);
    }
    const postStats = await this.updatePostLikes(postId);
    return postStats;
  }

  async unlikePost(postId: string, userId: string) {
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

  async deletePost(id: string, userId: string) {
    const post = await this.getPost(id);
    if (post.userId !== userId)
      throw new HttpException('You are not the author of this post', 403);
    await this.postRepository.deletePost(id);
  }

  async getPostComments(id: string, userId: string | null) {
    return await this.commentsService.getComments(id, userId);
  }
}
