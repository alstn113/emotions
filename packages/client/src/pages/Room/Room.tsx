// hooks
import { useQueryClient } from '@tanstack/react-query';
import { useCreateRoom, useGetRooms } from '~/hooks/queries/room';

// components
import styled from '@emotion/styled';
import { Button } from '~/components/common';
import TabLayout from '~/components/layouts/TabLayout';
import RoomList from './RoomList';
import AsyncBoundary from '~/components/base/AsyncBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';
import { MESSAGE } from '~/constants';
import { mediaQuery } from '~/lib/styles';

const Room = () => {
  const queryClient = useQueryClient();

  const { mutate: createRoom } = useCreateRoom({
    onSuccess: () => {
      queryClient.refetchQueries(useGetRooms.getKey());
    },
  });

  const handleCreateRoom = () => {
    createRoom({
      name: `Room-${crypto.randomUUID()}`,
    });
  };

  return (
    <TabLayout>
      <Container>
        <Button shadow onClick={handleCreateRoom}>
          Create Room
        </Button>
        <Spacer />
        <AsyncBoundary
          rejectedFallback={
            <ErrorFallback
              message={MESSAGE.ERROR.LOAD_DATA}
              queryKey={useGetRooms.getKey()}
            />
          }
        >
          <RoomList />
        </AsyncBoundary>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  padding: 16px;
  ${mediaQuery.desktop} {
    width: 1200px;
    margin: 0 auto;
  }
`;

const Spacer = styled.div`
  margin: 1rem;
`;

export default Room;
