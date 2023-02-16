// components
import styled from '@emotion/styled';
import { useRouteError } from 'react-router-dom';
import TabLayout from '~/components/layouts/TabLayout';
import { extractError } from '~/lib/error';
import NotFoundLottie from '~/assets/lotties/not-found.json';
import Lottie from 'react-lottie';
import { mediaQuery } from '~/lib/styles';
const UserErrorBoundary = () => {
  const _error = useRouteError();
  console.error(JSON.stringify(_error));
  const error = extractError(_error);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundLottie,
  };

  return (
    <TabLayout>
      <Container>
        <h1>{error.message}</h1>
        <h2>{error.statusCode}</h2>
        <Lottie options={defaultOptions} />
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
  margin-top: 50px;
  h1 {
    font-size: 2rem;
    font-weight: 900;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  div {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 300px;
    max-width: 500px;
    max-height: 500px;
  }

  ${mediaQuery.tablet} {
    h1 {
      font-size: 4rem;
      font-weight: 900;
    }
    h2 {
      font-size: 3rem;
      font-weight: 700;
    }
  }

  // gradient text color
  background: linear-gradient(to bottom, #b23eff, #ff8cf0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default UserErrorBoundary;
