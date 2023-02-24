import styled from '@emotion/styled';
import { Outlet, Link, useParams } from 'react-router-dom';
import { Avatar } from '~/components/common';
import TabLayout from '~/components/layouts/TabLayout';
import { useGetUserByUsername } from '~/hooks/queries/user';
import { mediaQuery } from '~/lib/styles';
import { User } from '~/lib/types';

const UserLayout = () => {
  const { username } = useParams() as { username: string };
  const { data } = useGetUserByUsername(username, {
    suspense: true,
  });
  const user = data as User; // suspense

  return (
    <TabLayout>
      <Container>
        <UserProfileContainer>
          <Avatar size="xl" src={user.profileImage} />
          <UserInfo>
            <div className="username">{user.username}</div>
            <div className="displayName">{user.displayName}</div>
          </UserInfo>
        </UserProfileContainer>
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
  margin: 0 auto;
  width: 100%;
  ${mediaQuery.tablet} {
    width: 736px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
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

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 180px;
  background-color: #fff;
  border-bottom: 2px solid #e5e5e5;
  margin-top: 1rem;
  padding: 0 2rem;

  ${mediaQuery.tablet} {
    margin-top: 5rem;
  }
`;

const UserInfo = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .username {
    font-size: 2rem;
    color: #000;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .displayName {
    font-size: 1.5rem;
    font-weight: 500;
    color: #787f85;
  }
`;

export default UserLayout;
