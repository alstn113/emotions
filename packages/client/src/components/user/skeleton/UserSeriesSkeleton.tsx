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

const SeriesItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background-color: #f5f5f5;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  font-size: 2rem;

  &:hover {
    background-color: #e5e5e5;
  }

  ${mediaQuery.tablet} {
    font-size: 1.5rem;
    height: 300px;
  }
`;

export default UserSeriesSkeleton;
