// react
import { Link } from 'react-router-dom';

// hooks
import { useQueryClient } from '@tanstack/react-query';
import { useCreateRoom, useGetRooms, useDeleteRoom } from '~/hooks/queries/room';

// components
import styled from '@emotion/styled';
import { Button } from '~/components/common';
import TabLayout from '~/components/layouts/TabLayout';
import { glassmorphism, mediaQuery } from '~/styles';

const Home = () => {
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
              <RoomCard key={room.id}>
                <Link to={`/room/${room.id}`}>Room: {room.id}</Link>
                <div>{room.name}</div>
                <div>{room.hostId}</div>
                <Spacer />
                <Button size="auto" shadow color="error" onClick={() => handleDeleteRoom(room.id)}>
                  Delete
                </Button>
              </RoomCard>
            );
          })}
        </RoomList>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  padding: 16px;
`;

const Spacer = styled.div`
  margin: 1rem;
`;

const RoomList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  ${mediaQuery.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mediaQuery.desktop} {
    grid-template-columns: repeat(3, 1fr);
    margin-left: auto;
    margin-right: auto;
  }
  gap: 48px;
`;

const RoomCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  ${glassmorphism}
`;

export default Home;
