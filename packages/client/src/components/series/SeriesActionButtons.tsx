import styled from '@emotion/styled';
import { Button } from '../common';

interface Props {
  isEditing: boolean;
  onEdit: () => void;
  onApply: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

const SeriesActionButtons = ({
  isEditing,
  onEdit,
  onApply,
  onDelete,
  onCancel,
}: Props) => {
  return (
    <Container>
      {isEditing ? (
        <ButtonsWrapper>
          <Button shadow color="success" onClick={onApply}>
            Apply
          </Button>
          <Button shadow color="error" onClick={onCancel}>
            Cancel
          </Button>
        </ButtonsWrapper>
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
