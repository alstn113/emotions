import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { TextInput } from '../common';

interface Props {
  seriesName: string;
  nextSeriesName: string;
  isEditing: boolean;
  onChangeNextName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SeriesNameEditor = ({
  isEditing,
  nextSeriesName,
  onChangeNextName,
  seriesName,
}: Props) => {
  const seriesNameRef = useRef<HTMLInputElement>(null);

  // input focus
  useEffect(() => {
    if (isEditing && seriesNameRef.current) {
      seriesNameRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Container>
      {isEditing ? (
        <TextInput
          variant="underlined"
          placeholder="수정될 시리즈 이름"
          ref={seriesNameRef}
          value={nextSeriesName}
          onChange={onChangeNextName}
        />
      ) : (
        <div>{seriesName}</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 1rem;
`;

export default SeriesNameEditor;
