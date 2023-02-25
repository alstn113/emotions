import styled from '@emotion/styled';
import { LoadingSpinner } from '../common';
import TabLayout from '../layouts/TabLayout';

const Loading = () => {
  return (
    <TabLayout>
      <Container>
        <LoadingSpinner />
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
`;

export default Loading;
