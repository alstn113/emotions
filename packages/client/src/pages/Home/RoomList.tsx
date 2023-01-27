// react
import { Link } from 'react-router-dom';

// hooks
import { useQueryClient } from '@tanstack/react-query';
import { useGetRooms, useDeleteRoom } from '~/hooks/queries/room';

// components
import styled from '@emotion/styled';
import { Button } from '~/components/common';
import { glassmorphism, mediaQuery } from '~/styles';

const RoomList = () => {
  const queryClient = useQueryClient();
  const { data: rooms } = useGetRooms();

  const { mutate: deleteRoom } = useDeleteRoom({
    onSuccess: () => {
      queryClient.refetchQueries(useGetRooms.getKey());
    },
  });

  const handleDeleteRoom = (id: string) => {
    deleteRoom(id);
  };
  return (
    <Container>
      {rooms?.map((room) => {
        return (
          <RoomCard key={room.id}>
            <Link to={`/room/${room.id}`}>Room: {room.id}</Link>
            <div>{room.name}</div>
            <div>{room.hostId}</div>
            <Spacer />
            <Button size="sm" shadow color="error" onClick={() => handleDeleteRoom(room.id)}>
              Delete
            </Button>
          </RoomCard>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
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

const Spacer = styled.div`
  margin: 1rem;
`;

export default RoomList;
