import styled from '@emotion/styled';
import { Button } from '../common';

interface Props {
  isEditing: boolean;
  onEdit: () => void;
  onApply: () => void;
  onDelete: () => void;
}

const SeriesActionButtons = ({
  isEditing,
  onEdit,
  onApply,
  onDelete,
}: Props) => {
  return (
    <Container>
      {isEditing ? (
        <Button shadow color="success" onClick={onApply}>
          Apply
        </Button>
      ) : (
        <ButtonsWrapper>
          <Button shadow color="warning" onClick={onEdit}>
            Edit
          </Button>
          <Button shadow color="error" onClick={onDelete}>
            Delete
          </Button>
        </ButtonsWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export default SeriesActionButtons;
