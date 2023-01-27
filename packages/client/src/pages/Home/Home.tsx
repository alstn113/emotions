import styled from '@emotion/styled';
import TabLayout from '~/components/layouts/TabLayout';

const Home = () => {
  return (
    <TabLayout>
      <Container>Home</Container>
    </TabLayout>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 5rem;
  font-weight: 700;
`;

export default Home;
