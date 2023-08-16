import styled from '@emotion/styled';

import { Button } from '~/components/common';

import useWriteStore from '~/stores/useWriteStore';

const PublishSeriesSetting = () => {
  const { changeEditSeries, series, changeSeries } = useWriteStore();

  const handleEditSeries = () => {
    changeEditSeries(true);
  };

  const handleDeleteSeries = () => {
    changeSeries(null);
    changeEditSeries(false);
  };

  return (
    <Container>
      <Title>Series Setting</Title>
      {series ? (
        <SeriesConfigContainer>
          <SelectedSeries>{series.name}</SelectedSeries>
          <Button shadow size="sm" color="error" onClick={handleDeleteSeries}>
            Delete From A Series
          </Button>
          <Button shadow size="sm" color="secondary" onClick={handleEditSeries}>
            Reselect Series
          </Button>
        </SeriesConfigContainer>
      ) : (
        <Button shadow size="auto" color="warning" onClick={handleEditSeries}>
          Add To Series
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;

const SeriesConfigContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SelectedSeries = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f1f3f5;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Title = styled.div`
  width: 100%;
  text-align: left;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export default PublishSeriesSetting;
