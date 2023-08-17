import { useEffect } from 'react';
import { Outlet, useParams, NavLink } from 'react-router-dom';

import styled from '@emotion/styled';

import { Avatar } from '~/components/common';

import { useGetUserByUsername } from '~/hooks/queries/user';

import { mediaQuery } from '~/lib/styles';
import { User } from '~/lib/types';

const UserLayout = () => {
  const { username } = useParams() as { username: string };
  const { data } = useGetUserByUsername(username, {
    suspense: true,
  });
  const user = data as User; // suspense

  // 새로운 유저 포스트를 불러올 때마다 스크롤을 맨 위로 올려준다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [username]);

  return (
    <>
      <UserProfileContainer>
        <Avatar size="xl" src={user.profileImage} />
        <UserInfo>
          <div className="username">{user.username}</div>
          <div className="displayName">{user.displayName}</div>
        </UserInfo>
      </UserProfileContainer>
      <TabsWrapper>
        <TabItem to={`/user/${username}`} end>
          Posts
        </TabItem>
        <TabItem to={`/user/${username}/series`} end>
          Series
        </TabItem>
      </TabsWrapper>
      <Outlet />
    </>
  );
};

const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  ${mediaQuery.tablet} {
    width: 50%;
    border-radius: 1rem;
  }
  height: 50px;
  background-color: #f5f5f5;
  font-size: 1.5rem;
`;

const TabItem = styled(NavLink)`
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
  &.active {
    background-color: #e3e3e3;
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
