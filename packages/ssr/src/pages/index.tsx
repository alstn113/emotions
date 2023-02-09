import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';
import TabLayout from '~/components/layouts/TabLayout';
import PostList from '~/components/home/PostList';

export default function Home() {
  return (
    <TabLayout>
      <Container>
        <PostList />
      </Container>
    </TabLayout>
  );
}

const Container = styled.div`
  padding: 16px;
  ${mediaQuery.desktop} {
    width: 1200px;
    margin: 0 auto;
  }
`;
