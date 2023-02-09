import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';
import TabLayout from '~/components/layouts/TabLayout';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import {
  dehydrate,
  DehydratedState,
  InfiniteData,
  QueryClient,
} from '@tanstack/react-query';
import { useGetPosts } from '~/hooks/queries/post';
import PostList from '~/components/home/PostList';
import { PostListResponse } from '~/lib/types';
import { extractError } from '~/lib/error';

export default function Home() {
  return (
    <TabLayout>
      <Container>
        <PostList />
      </Container>
    </TabLayout>
  );
}

const Container = styled.div`
  padding: 16px;
  ${mediaQuery.desktop} {
    width: 1200px;
    margin: 0 auto;
  }
`;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchInfiniteQuery(
      useGetPosts.getKey(),
      useGetPosts.fetcher(),
    );

    const pages = queryClient.getQueryData<InfiniteData<PostListResponse>>(
      useGetPosts.getKey(),
    )?.pages;
    queryClient.setQueryData(useGetPosts.getKey(), {
      pages,
      pageParams: [null],
    });

    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (e) {
    queryClient.resetQueries({ queryKey: useGetPosts.getKey() });
    return { props: { dehydratedState: dehydrate(queryClient) } };
  } finally {
    queryClient.clear();
  }
};
