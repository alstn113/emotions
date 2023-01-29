import { HttpException, Injectable } from '@nestjs/common';
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

  async getPostById(id: string) {
    const post = await this.postRepository.findPostById(id);
    if (!post) throw new HttpException('Post not found', 404);
    return post;
  }

  async createPost(dto: CreatePostDto, userId: string) {
    const post = await this.postRepository.createPost(dto, userId);
    await this.postRepository.createPostStats(post.id);

    return post;
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
    const post = await this.getPostById(id);
    if (post.userId !== userId) throw new HttpException('You are not the author of this post', 403);
    await this.postRepository.deletePost(id);
  }

  async getPostComments(id: string) {
    return await this.commentsService.getComments(id);
  }
}
