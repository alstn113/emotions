import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Auth() {
  const [token] = useSearchParams();
  const accessToken = token.get('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);

      navigate('/chat', {
        // 뒤로가기 버튼을 눌렀을 때, 이전 페이지로 이동하지 않고, 홈으로 이동하도록 설정
        replace: true,
      });
    }
  }, []);
  return <></>;
}
