import styled from '@emotion/styled';
import { QueryClient } from '@tanstack/react-query';
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom';
import TabLayout from '~/components/layouts/TabLayout';
import { useGetUserByUsername } from '~/hooks/queries/user';
import { mediaQuery } from '~/lib/styles';
import { User } from '~/lib/types';

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const username = params?.username;
    return (
      queryClient.getQueryData<User>(useGetUserByUsername.getKey(username)) ??
      (await queryClient.fetchQuery(
        useGetUserByUsername.getKey(username),
        useGetUserByUsername.fetcher(username),
      ))
    );
  };

const UserPage = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { username } = useParams() as { username: string };
  const { data: user } = useGetUserByUsername(username, {
    initialData,
  });

  return (
    <TabLayout>
      <Container>
        <UserProfileWrapper>
          {user?.id} {user?.username}
        </UserProfileWrapper>
        <div>공사 중 입니다...</div>
        <TabsWrapper>
          <TabItem to="">Posts</TabItem>
          <TabItem to="series">Series</TabItem>
          <TabItem to="about">About</TabItem>
        </TabsWrapper>
        <Outlet />
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  padding: 16px;
  ${mediaQuery.desktop} {
    width: 1200px;
    margin: 0 auto;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  width: 100%;
  ${mediaQuery.tablet} {
    width: 50%;
  }
  height: 50px;
  background-color: #f5f5f5;
  font-size: 1.5rem;
  margin-top: 2rem;
`;

const TabItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #000;
  text-decoration: none;
  transition: 0.3s;
  &:hover {
    background-color: #e5e5e5;
  }
`;

const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  background-color: #f5f5f5;
  font-size: 2rem;
`;

export default UserPage;
