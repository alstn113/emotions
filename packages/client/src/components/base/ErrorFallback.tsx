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
        <Text>{e.message}</Text>
        <Text>{e.statusCode}</Text>
        <Button shadow color="error" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Container>
    </BaseLayout>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 1rem;
`;

const Text = styled.div`
  color: red;
  font-weight: 700;
  font-size: 3rem;
`;

export default ErrorFallback;
