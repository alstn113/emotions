import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '~/components/common';
import useCreateSeries from '~/hooks/queries/series/useCreateSeries';
import useGetUserSeries from '~/hooks/queries/series/useGetUserSeries';
import useUser from '~/hooks/useUser';
import useWriteStore from '~/stores/useWriteStore';

const PublishEditSeries = () => {
  const user = useUser();
  const { changeEditSeries, changeSeries, series } = useWriteStore();
  const [selected, setSelected] = useState<{
    id: string;
    name: string;
  } | null>(series);
  const [input, setInput] = useState('');
  const { data: seriesList } = useGetUserSeries(user?.username!);
  const { mutate } = useCreateSeries();
  const queryClient = useQueryClient();

  const handleCloseEditSeries = () => {
    changeEditSeries(false);
  };

  const handleSeriesClick = (id: string, name: string) => {
    setSelected({ id, name });
  };

  const handleSeriesChange = () => {
    changeSeries(selected);
    changeEditSeries(false);
  };

  const handleCreateSeries = () => {
    if (!input) return;
    mutate(
      { name: input },
      {
        onSuccess: async (data) => {
          await queryClient.refetchQueries(
            useGetUserSeries.getKey(user?.username!),
          );
          setSelected({ id: data.id, name: data.name });
          setInput('');
        },
        onError: (error) => {
          alert('시리즈 생성에 실패했습니다.');
          console.log(error);
        },
      },
    );
  };
  return (
    <Container>
      <EditSeriesContainer>
        <Title>Edit Series</Title>
        <CreateSeriesInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button size="auto" color="primary" shadow onClick={handleCreateSeries}>
          Create Series
        </Button>
        <SeriesList>
          {seriesList?.map((s) => {
            return (
              <SeriesItem
                key={s.id}
                onClick={() => handleSeriesClick(s.id, s.name)}
                checked={selected?.id === s.id}
              >
                {s.name}
              </SeriesItem>
            );
          })}
        </SeriesList>
      </EditSeriesContainer>
      <ButtonsWrapper>
        <Button color="error" shadow onClick={handleCloseEditSeries}>
          Cancel
        </Button>
        <Button color="success" shadow onClick={handleSeriesChange}>
          Select
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const EditSeriesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.div`
  width: 100%;
  text-align: left;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const CreateSeriesInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid #dee2e6;
  border-radius: 4px;
`;

const SeriesList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  overflow-y: auto;
  background: #f1f3f5;
`;

const SeriesItem = styled.li<{ checked: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  transition: 0.2s;
  background-color: ${({ checked }) => (checked ? '#7ebaff' : '#f1f3f5')};
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 1rem;
`;

export default PublishEditSeries;
