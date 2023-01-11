import React from 'react';
import useSocket from '~/hooks/useSocket';

const Home = () => {
  useSocket();

  return <div>Home</div>;
};

export default Home;
