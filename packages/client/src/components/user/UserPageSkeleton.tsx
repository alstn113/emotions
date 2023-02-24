import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';

const UserPageSkeleton = () => {
  return <Container />;
};

const shine = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
  }
`;

const Container = styled.div`
  margin-top: 2rem;
  height: 200px;
  width: 100%;
  ${mediaQuery.desktop} {
    width: 1200px;
    margin: 0 auto;
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: ${shine} 1s ease-in-out infinite;
`;

export default UserPageSkeleton;
