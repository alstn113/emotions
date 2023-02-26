import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';

const UserSeriesSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((s) => (
        <SeriesItem key={s} />
      ))}
    </>
  );
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

const SeriesItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background-color: #f5f5f5;
  transition: ${shine} 1s ease-in-out infinite;
  cursor: pointer;
  font-size: 2rem;

  ${mediaQuery.tablet} {
    font-size: 1.5rem;
    height: 300px;
  }
`;

export default UserSeriesSkeleton;
