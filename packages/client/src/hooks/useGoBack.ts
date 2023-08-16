import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useGoBack() {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return goBack;
}
