// components
import styled from '@emotion/styled';
import TabLayout from '~/components/layouts/TabLayout';

export default function Search() {
  return (
    <TabLayout>
      <Container>SearchPage</Container>
    </TabLayout>
  );
}

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
