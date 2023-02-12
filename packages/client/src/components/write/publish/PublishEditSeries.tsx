import styled from '@emotion/styled';
import { Button } from '~/components/common';
import useGetUserSeries from '~/hooks/queries/series/useGetUserSeries';
import useUser from '~/hooks/useUser';
import useWriteStore from '~/stores/useWriteStore';

const PublishEditSeries = () => {
  const user = useUser();
  const { changeEditSeries } = useWriteStore();
  const { data: series } = useGetUserSeries(user?.username!);

  const handleCloseEditSeries = () => {
    changeEditSeries(false);
  };
  return (
    <Container>
      <div>
        <Title>Edit Series</Title>
        <SeriesList>
          {series?.map((s) => {
            return <SeriesItem key={s.id}>{s.name}</SeriesItem>;
          })}
        </SeriesList>
      </div>
      <ButtonsWrapper>
        <Button color="error" shadow onClick={handleCloseEditSeries}>
          Cancel
        </Button>
        <Button color="success" shadow onClick={() => {}}>
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

const Title = styled.div`
  width: 100%;
  text-align: left;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const SeriesList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 250px;
  overflow-y: auto;
`;

const SeriesItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
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
