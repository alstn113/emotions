// hooks
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import { useCreateRoom, useGetRooms } from '~/hooks/queries/room';

// components
import styled from '@emotion/styled';
import { Button } from '~/components/common';
import TabLayout from '~/components/layouts/TabLayout';
import RoomList from '~/components/room/RoomList';
import { mediaQuery } from '~/lib/styles';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';

export default function Room() {
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
        <RoomList />
      </Container>
    </TabLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.fetchQuery(useGetRooms.getKey(), useGetRooms.fetcher()),
    ]);

    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (e) {
    await queryClient.resetQueries(useGetRooms.getKey());
    return { props: { dehydratedState: dehydrate(queryClient) } };
  } finally {
    queryClient.clear();
  }
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
