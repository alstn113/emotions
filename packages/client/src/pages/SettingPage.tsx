// react
import { GITHUB_OAUTH_LOGIN_URL } from '~/constants';

// hooks
import useLogout from '~/hooks/useLogout';
import useUser from '~/hooks/useUser';

// components
import styled from '@emotion/styled';
import { Button } from '~/components/common';
import TabLayout from '~/components/layouts/TabLayout';
import { GithubIcon } from '~/components/vectors';
import { glassmorphism } from '~/lib/styles';

const SettingPage = () => {
  const user = useUser();
  const handleGithubLogin = () => {
    window.location.href = GITHUB_OAUTH_LOGIN_URL;
  };

  const logout = useLogout();

  return (
    <TabLayout>
      <Container>
        {user ? (
          <Box>
            <Text>My Account</Text>
            <Text>Username: {user?.username}</Text>
            <Text>Displayname: {user?.displayName}</Text>
            <Button size="auto" shadow color="error" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Text>Not Logged In</Text>
            <StyledButton
              size="auto"
              shadow
              color="secondary"
              onClick={handleGithubLogin}
            >
              <GithubIcon />
              <span>Login With Github</span>
            </StyledButton>
          </Box>
        )}
      </Container>
    </TabLayout>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  margin: auto auto;
  height: 25rem;
  width: 16rem;
  border-radius: 20px;
  border: 1px solid #e5e5e5;
  padding: 1rem;
  ${glassmorphism}
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
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

export default SettingPage;
