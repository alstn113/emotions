import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetUserSeriesByName,
  useGetUserSeries,
  useEditSeries,
  useDeleteSeries,
} from '~/hooks/queries/series';
import useDisclosure from '~/hooks/useDisclosure';
import useUser from '~/hooks/useUser';
import { extractError } from '~/lib/error';
import { Series } from '~/lib/types';
import useModalStore from '~/stores/useModalStore';
import SeriesActionButtons from './SeriesActionButtons';
import SeriesEditor from './SeriesEditor';
import SeriesName from './SeriesName';
import SeriesPosts from './SeriesPosts';

interface Props {
  username: string;
  seriesName: string;
}

const SeriesPageContents = ({ username, seriesName }: Props) => {
  const navigate = useNavigate();
  const { data } = useGetUserSeriesByName(username, seriesName, {
    suspense: true,
  });
  const series = data as Series; // suspense
  const queryClient = useQueryClient();

  const user = useUser();
  const { isOpen: isEditing, onToggle: toggleEditing } = useDisclosure({
    defaultIsOpen: false,
  });
  const { openModal } = useModalStore();

  const [nextSeriesName, setNextSeriesName] = useState(series?.name);
  const [order, setOrder] = useState<string[]>([]);
  const isMySeries = data?.userId === user?.id;

  useEffect(() => {
    setNextSeriesName(series.name);
    setOrder(series.seriesPosts.map((item) => item.id));
  }, [series]);

  const { mutate: editSeries } = useEditSeries({
    onSuccess: async () => {
      await queryClient.refetchQueries(
        useGetUserSeriesByName.getKey(username, seriesName),
      );
      navigate(`/user/${username}/series/${nextSeriesName}`);
      toggleEditing();
    },
    onError: (e) => {
      const error = extractError(e);
      alert(error.message);
    },
  });

  const { mutate: deleteSeries } = useDeleteSeries({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetUserSeries.getKey(username));
      navigate(`/user/${username}/series`);
    },
    onError: (e) => {
      const error = extractError(e);
      alert(error.message);
    },
  });

  const handleChangeNextName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNextSeriesName(e.target.value);
  };

  const handleApply = () => {
    openModal({
      title: '시리즈 수정',
      message: '정말로 시리즈를 수정하시겠습니까?s',
      onConfirm: () => {
        editSeries({
          seriesId: series.id,
          name: nextSeriesName,
          seriesOrder: order,
        });
      },
    });
  };

  const handleDelete = () => {
    openModal({
      title: '시리즈 삭제',
      message: '시리즈를 삭제해도 포스트는 삭제되지 않습니다.',
      onConfirm: () => {
        deleteSeries(series.id);
      },
    });
  };

  return (
    <Container>
      <SeriesName
        isEditing={isEditing}
        nextSeriesName={nextSeriesName}
        onChangeNextName={handleChangeNextName}
        seriesName={series.name}
      />

      {isMySeries && (
        <SeriesActionButtons
          isEditing={isEditing}
          onEdit={toggleEditing}
          onApply={handleApply}
          onDelete={handleDelete}
          onCancel={toggleEditing}
        />
      )}

      {isEditing ? (
        <SeriesEditor
          seriesPosts={series.seriesPosts}
          onChangeSeriesOrder={setOrder}
        />
      ) : (
        <SeriesPosts username={username} seriesPosts={series.seriesPosts} />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default SeriesPageContents;
