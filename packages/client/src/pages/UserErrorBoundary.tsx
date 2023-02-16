// components
import styled from '@emotion/styled';
import { useRouteError } from 'react-router-dom';
import TabLayout from '~/components/layouts/TabLayout';
import { extractError } from '~/lib/error';

const UserErrorBoundary = () => {
  const _error = useRouteError();
  console.error(JSON.stringify(_error));
  const error = extractError(_error);

  return (
    <TabLayout>
      <Container>
        <h1>{error.message}</h1>
        <h2>{error.statusCode}</h2>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  h1 {
    font-size: 4rem;
    font-weight: 900;
  }
  h2 {
    font-size: 3rem;
    font-weight: 700;
  }
  // gradient text color
  background: linear-gradient(to bottom, #b23eff, #ff8cf0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default UserErrorBoundary;
