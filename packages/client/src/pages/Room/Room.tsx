import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { initRoomSocket, leaveRoom } from '~/libs/sockets/roomSocket';

const Room = () => {
  const { roomId } = useParams() as { roomId: string };

  useEffect(() => {
    initRoomSocket(roomId);

    return () => {
      leaveRoom();
    };
  }, [roomId]);

  return <div>Room</div>;
};

export default Room;
