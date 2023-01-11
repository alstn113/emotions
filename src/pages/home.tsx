import React, { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import SOCKET_EVENT from '~/constants/event';
import useSocket from '~/hooks/useSocket';

const Home = () => {
  const socket = useSocket();

  return <div>Home</div>;
};

export default Home;
