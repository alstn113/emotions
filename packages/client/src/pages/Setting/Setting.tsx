import styled from '@emotion/styled';
import { Button } from '~/components/common';
import TabLayout from '~/components/layouts/TabLayout';
import { GithubIcon } from '~/components/vectors';
import { API } from '~/constants';
import useLogout from '~/hooks/useLogout';
import useUser from '~/hooks/useUser';
import { glassmorphism } from '~/styles';

const Setting = () => {
  const user = useUser();
  const handleGithubLogin = () => {
    window.location.href = API.GITHUB_AUTH;
  };

  const logout = useLogout();

  return (
    <TabLayout>
      <Container>
        <Text>My Account</Text>
        <Text>Username: {user?.username}</Text>
        <Text>Displayname: {user?.displayName}</Text>
        <StyledButton size="auto" shadow color="secondary" onClick={handleGithubLogin}>
          <GithubIcon />
          <span>Login With Github</span>
        </StyledButton>
        <Button size="auto" shadow color="error" onClick={logout}>
          Logout
        </Button>
      </Container>
    </TabLayout>
  );
};

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  margin: auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25rem;
  width: 16rem;
  border-radius: 20px;
  border: 1px solid #e5e5e5;
  padding: 1rem;
  ${glassmorphism}
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  svg {
    width: 24px;
    height: 24px;
    fill: #aaaaaa;
    margin-right: 1rem;
  }
`;

export default Setting;
