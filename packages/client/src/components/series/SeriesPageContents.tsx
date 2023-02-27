import styled from '@emotion/styled';
import { useState } from 'react';
import useGetUserSeriesByName from '~/hooks/queries/series/useGetUserSeriesByName';
import useDisclosure from '~/hooks/useDisclosure';
import useUser from '~/hooks/useUser';
import { Series } from '~/lib/types';
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

  const [order, setOrder] = useState<string[]>([]);
  const isMySeries = data?.userId === user?.id;

  return (
    <Container>
      <div>{series?.name}</div>
      <div>
        {isMySeries && (
          <SeriesActionButtons
            isEditing={isEditing}
            onEdit={toggleEditing}
            onApply={() => {
              // empty
            }}
            onDelete={() => {
              // empty
            }}
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
