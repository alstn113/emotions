import styled from '@emotion/styled';
import { useState } from 'react';
import useGetUserSeriesByName from '~/hooks/queries/series/useGetUserSeriesByName';
import useDisclosure from '~/hooks/useDisclosure';
import useUser from '~/hooks/useUser';
import { Series } from '~/lib/types';
import useModalStore from '~/stores/useModalStore';
import SeriesActionButtons from './SeriesActionButtons';
import SeriesEditor from './SeriesEditor';
import SeriesPosts from './SeriesPosts';

interface Props {
  username: string;
  seriesName: string;
}

const SeriesPageContents = ({ username, seriesName }: Props) => {
  const { data } = useGetUserSeriesByName(username, seriesName, {
    suspense: true,
  });
  const series = data as Series; // suspense

  const user = useUser();
  const { isOpen: isEditing, onToggle: toggleEditing } = useDisclosure({
    defaultIsOpen: false,
  });
  const { openModal } = useModalStore();

  const [order, setOrder] = useState<string[]>([]);
  const isMySeries = data?.userId === user?.id;

  const handleApply = () => {
    openModal({
      title: '시리즈 수정',
      message: '정말로 시리즈를 수정하시겠습니까?',
      onConfirm: () => {
        // empty
      },
    });
  };

  const handleDelete = () => {
    openModal({
      title: '시리즈 삭제',
      message: '정말로 시리즈를 삭제하시겠습니까?',
      onConfirm: () => {
        // empty
      },
    });
  };

  return (
    <Container>
      <div>{series?.name}</div>
      <div>
        {isMySeries && (
          <SeriesActionButtons
            isEditing={isEditing}
            onEdit={toggleEditing}
            onApply={handleApply}
            onDelete={handleDelete}
            onCancel={toggleEditing}
          />
        )}
      </div>

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
