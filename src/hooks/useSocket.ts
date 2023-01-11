import axios from 'axios';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import SOCKET_EVENT from '~/constants/event';

const useSocket = () => {
  const socket = useRef<Socket>();

  useEffect(() => {
    axios.get('/api/socket').finally(() => {
      socket.current = io();

      socket.current.on('connect', () => {
        console.log('connected');
      });

      socket.current.on(SOCKET_EVENT.MESSAGE, (data: { message: string }) => {
        console.log(data.message);
      });
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return socket.current;
};

export default useSocket;
