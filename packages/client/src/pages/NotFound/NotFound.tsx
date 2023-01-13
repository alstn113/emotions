import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  // redirect to home page
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
  }, []);

  return <></>;
};

export default NotFound;
