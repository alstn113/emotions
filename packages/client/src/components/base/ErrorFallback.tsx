import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';

interface Props {
  message: string;
  queryKey?: string[];
}

const ErrorFallback = ({ message, queryKey }: Props) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.resetQueries(queryKey && queryKey);
  }, [queryClient, queryKey]);

  return (
    <Container>
      <Text>
        <h1>ERROR</h1>
        <h2>{message}</h2>
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Text = styled.div`
  color: red;
  h1 {
    font-weight: 700;
    font-size: 2rem;
  }
  h2 {
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

export default ErrorFallback;
