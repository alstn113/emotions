import styled from '@emotion/styled';
import { useGoBack } from '~/hooks/useGoBack';
import { ArrowLeft } from '../vectors';

const HeaderBackButton = () => {
  const goBack = useGoBack();
  return (
    <IconButton onClick={goBack}>
      <ArrowLeft width={24} height={24} />
    </IconButton>
  );
};

const IconButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: -8px;
  svg {
    color: #fff;
    width: 24px;
    height: 24px;
  }
`;

export default HeaderBackButton;
