import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { mediaQuery } from '~/lib/styles';

import { Button } from '../common';

interface Props {
  isEmailEdit: boolean;
  nextEmail: string;
  onChangeNextEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: () => void;
  onCancel: () => void;
}

const EmailEditor = ({
  isEmailEdit,
  nextEmail,
  onChangeNextEmail,
  onEdit,
  onCancel,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isEmailEdit) {
      inputRef.current?.focus();
    }
  }, [isEmailEdit]);

  return (
    <Container>
      <Input
        ref={inputRef}
        placeholder="Write Email..."
        onChange={onChangeNextEmail}
        value={nextEmail}
      />
      <ButtonsWrapper>
        <Button size="sm" color="success" shadow onClick={onEdit}>
          Confirm
        </Button>
        <Button size="sm" color="error" shadow onClick={onCancel}>
          Cancel
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  ${mediaQuery.mobile} {
    flex-direction: row;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  ${mediaQuery.mobile} {
    width: auto;
    justify-content: center;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  background: transparent;
  border-bottom: 2px solid #b4b4b4;
  outline: none;
  font-size: 1rem;
  transition: border-bottom 0.1s ease-in-out;
  &:focus {
    border-bottom: 2px solid #ffb049;
  }
`;

export default EmailEditor;
