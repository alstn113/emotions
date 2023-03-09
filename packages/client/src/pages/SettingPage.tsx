// react
import { GITHUB_OAUTH_LOGIN_URL } from '~/constants';

// hooks
import useLogout from '~/hooks/useLogout';
import useUser from '~/hooks/useUser';

// components
import styled from '@emotion/styled';
import { Button, Toggle } from '~/components/common';
import TabLayout from '~/components/layouts/TabLayout';
import { GithubIcon } from '~/components/vectors';
import { useEffect } from 'react';
import { mediaQuery } from '~/lib/styles';
import {
  useGetMe,
  useUpdateEmail,
  useUpdateEmailNotification,
} from '~/hooks/queries/user';
import { extractError } from '~/lib/error';
import { useQueryClient } from '@tanstack/react-query';

const SettingPage = () => {
  const user = useUser();
  const handleGithubLogin = () => {
    window.location.href = GITHUB_OAUTH_LOGIN_URL;
  };
  const queryClient = useQueryClient();
  const logout = useLogout();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { mutate: updateEmail } = useUpdateEmail({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetMe.getKey());
    },
    onError: (e) => {
      const error = extractError(e);
      alert(error.message);
    },
  });

  const { mutate: updateEmailNotification } = useUpdateEmailNotification({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetMe.getKey());
    },
    onError: (e) => {
      const error = extractError(e);
      alert(error.message);
    },
  });

  const handleChangeEmailNotification = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateEmailNotification({ enabled: e.target.checked });
  };

  return (
    <TabLayout>
      <Container>
        {user ? (
          <Box>
            <Text className="profile">Profile</Text>
            <Text>{user?.username}</Text>
            <Text>{user?.displayName}</Text>
            <Text>Email: {user?.email}</Text>
            <Toggle
              labelText="Email Notification"
              defaultChecked={user.emailNotification}
              onChange={handleChangeEmailNotification}
            />
            <Button size="auto" shadow color="error" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
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
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;

  width: 100%;
  height: 400px;
  padding: 2rem;
  ${mediaQuery.mobile} {
    border-radius: 20px;
    width: 500px;
    margin-top: 5rem;
    background-color: #f2f2f2;
  }
`;

const Text = styled.div`
  display: flex;
  font-size: 0.8rem;
  width: 100%;
  color: #000;
  &.profile {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 900;
  }
  ${mediaQuery.mobile} {
    font-size: 1.2rem;
    &.profile {
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 900;
    }
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 24px;
    height: 24px;
    fill: #aaaaaa;
    margin-right: 1rem;
  }
`;

export default SettingPage;
