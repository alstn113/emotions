import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

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
    <div>
      <div>ERROR</div>
      <div>{message}</div>
    </div>
  );
};

export default ErrorFallback;
