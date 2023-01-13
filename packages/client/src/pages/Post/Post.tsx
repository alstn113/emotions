import useGetPosts from '~/hooks/queries/post/useGetPosts';
import useCreatePost from '~/hooks/queries/post/useCreatePost';
import { useQueryClient } from '@tanstack/react-query';
import useDeletePost from '~/hooks/queries/post/useDeletePost';
import styled from '@emotion/styled';

const Post = () => {
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useGetPosts();
  const { mutate: createPost } = useCreatePost({
    onSuccess: () => {
      queryClient.refetchQueries(useGetPosts.getKey());
    },
  });
  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => {
      queryClient.refetchQueries(useGetPosts.getKey());
    },
  });

  const handleCreatePost = () => {
    createPost({
      title: crypto.randomUUID(),
      content: new Date().getTime().toString(),
    });
  };

  const handleDeletePost = (id: string) => {
    deletePost(id);
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <button onClick={handleCreatePost}>Create Post</button>
      <div>
        {posts?.map((post) => {
          return (
            <div key={post.id} onClick={() => handleDeletePost(post.id)}>
              <div>{post.title}</div>
              <div>{post.content}</div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

export default Post;
