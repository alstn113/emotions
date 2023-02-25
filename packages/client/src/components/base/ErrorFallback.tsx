// components
import styled from '@emotion/styled';
import { extractError } from '~/lib/error';
import { Button } from '../common';
import BaseLayout from '../layouts/BaseLayout';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  const e = extractError(error);

  return (
    <BaseLayout>
      <Container>
        <Text>
          <div>{e.message}</div>
          <div>{e.statusCode}</div>
        </Text>
        <Button shadow color="error" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Container>
    </BaseLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
`;

const Text = styled.div`
  color: red;
  font-weight: 700;
  font-size: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export default ErrorFallback;
