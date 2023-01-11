import { Server } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';
import SOCKET_EVENT from '~/constants/event';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!(res.socket as any).server.io) {
    console.log('socket.io is running');

    const io = new Server((res.socket as any).server);

    io.on('connection', (socket) => {
      console.log(`${socket.id} connected`);

      socket.emit(SOCKET_EVENT.MESSAGE, {
        message: `Hello from server ${socket.id}`,
      });
    });

    (res.socket as any).server.io = io;
  } else {
    console.log('socket.io already running');
  }
  res.end();
};

export default handler;
