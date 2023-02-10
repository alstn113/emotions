// react
import Link from 'next/link';

// components
import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';
import { Home, Create, Search, Settings, Comment } from '~/components/vectors';

const Footer = () => {
  return (
    <Container>
      <TabItem href="/">
        <Home width={24} height={24} />
      </TabItem>
      <TabItem href="/search">
        <Search width={24} height={24} />
      </TabItem>
      <TabItem href="/write">
        <Create width={24} height={24} />
      </TabItem>
      <TabItem href="/room">
        <Comment width={24} height={24} />
      </TabItem>
      <TabItem href="/setting">
        <Settings width={24} height={24} />
      </TabItem>
    </Container>
  );
};

const TabItem = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: #808080;
    width: 28px;
    height: 28px;
  }
  &.active {
    svg {
      color: #fff;
    }
  }
`;

const Container = styled.footer`
  display: flex;
  height: 60px;
  background: #000;

  ${mediaQuery.mobile} {
    display: none;
  }
`;

export default Footer;
