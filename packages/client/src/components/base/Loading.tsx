import styled from '@emotion/styled';
import { LoadingSpinner } from '../common';
import BaseLayout from '../layouts/BaseLayout';

const Loading = () => {
  return (
    <BaseLayout>
      <Container>
        <LoadingSpinner />
      </Container>
    </BaseLayout>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loading;
