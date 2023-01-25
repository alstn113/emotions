import styled from '@emotion/styled';
import TabLayout from '~/components/layouts/TabLayout';

const NotFound = () => {
  return (
    <TabLayout>
      <Container>
        <h1>NOT FOUND</h1>
        <h2>404</h2>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  h1 {
    font-size: 4rem;
    font-weight: 900;
  }
  h2 {
    font-size: 3rem;
    font-weight: 700;
  }
  // gradient text color
  background: linear-gradient(to bottom, #b23eff, #ff8cf0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default NotFound;
