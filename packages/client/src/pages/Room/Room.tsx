import useGetRooms from '~/hooks/queries/room/useGetRooms';
import useCreateRoom from '~/hooks/queries/room/useCreateRoom';
import { useQueryClient } from '@tanstack/react-query';
import useDeleteRoom from '~/hooks/queries/room/useDeleteRoom';
import styled from '@emotion/styled';
import { Button } from '~/components/common';
import { Link } from 'react-router-dom';

const Room = () => {
  const queryClient = useQueryClient();
  const { data: rooms, isLoading } = useGetRooms();
  const { mutate: createRoom } = useCreateRoom({
    onSuccess: () => {
      queryClient.refetchQueries(useGetRooms.getKey());
    },
  });
  const { mutate: deleteRoom } = useDeleteRoom({
    onSuccess: () => {
      queryClient.refetchQueries(useGetRooms.getKey());
    },
  });

  const handleCreateRoom = () => {
    createRoom({
      name: `Room-${crypto.randomUUID()}`,
    });
  };

  const handleDeleteRoom = (id: string) => {
    deleteRoom(id);
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <Spacer />
      <Button shadow onClick={handleCreateRoom}>
        Create Room
      </Button>
      <Spacer />
      <div>
        {rooms?.map((room) => {
          return (
            <RoomContainer key={room.id}>
              <Link to={room.id}>Room: {room.id}</Link>
              <div>{room.name}</div>
              <div>{room.ownerId}</div>
              <div onClick={() => handleDeleteRoom(room.id)}>Delete</div>
            </RoomContainer>
          );
        })}
      </div>
      <Spacer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Spacer = styled.div`
  margin: 1rem;
`;

const RoomContainer = styled.div`
  & + & {
    margin-top: 1rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  // glassmorphism
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 12px 0 rgba(100, 100, 100, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export default Room;
