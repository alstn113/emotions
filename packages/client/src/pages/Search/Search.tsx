import styled from '@emotion/styled';
import TabLayout from '~/components/layouts/TabLayout';
import { Button } from '~/components/common';
import useOpenLoginDialog from '~/hooks/useOpenLoginDialog';

const Search = () => {
  const openLoginDialog = useOpenLoginDialog();

  return (
    <TabLayout>
      <Container>
        Search
        <Button shadow onClick={openLoginDialog}>
          Dialog
        </Button>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 5rem;
  font-weight: 700;
`;

export default Search;
