// react
import { Link } from 'react-router-dom';

// hooks
import { useQueryClient } from '@tanstack/react-query';
import { useCreateRoom, useGetRooms, useDeleteRoom } from '~/hooks/queries/room';

// components
import styled from '@emotion/styled';
import { Button } from '~/components/common';
import TabLayout from '~/components/layouts/TabLayout';
import { glassmorphism } from '~/styles';

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
    <TabLayout>
      <Container>
        <Button shadow onClick={handleCreateRoom}>
          Create Room
        </Button>
        <Spacer />
        <RoomList>
          {rooms?.map((room) => {
            return (
              <RoomContainer key={room.id}>
                <Link to={room.id}>Room: {room.id}</Link>
                <div>{room.name}</div>
                <div>{room.hostId}</div>
                <Spacer />
                <Button size="auto" shadow color="error" onClick={() => handleDeleteRoom(room.id)}>
                  Delete
                </Button>
              </RoomContainer>
            );
          })}
        </RoomList>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 12px;
`;

const Spacer = styled.div`
  margin: 1rem;
`;

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  ${glassmorphism}
`;

export default Room;
