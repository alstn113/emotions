import styled from '@emotion/styled';
import { mediaQuery, shine } from '~/lib/styles';

const SeriesContentsSkeleton = () => {
  return <Container />;
};

const Container = styled.div`
  margin-top: 4rem;
  height: 200px;
  width: 100%;
  ${mediaQuery.desktop} {
    width: 738px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: ${shine} 1s ease-in-out infinite;
`;

export default SeriesContentsSkeleton;
