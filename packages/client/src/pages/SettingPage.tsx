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
import { useEffect, useState } from 'react';
import { mediaQuery } from '~/lib/styles';
import {
  useGetMe,
  useUpdateEmail,
  useUpdateEmailNotification,
} from '~/hooks/queries/user';
import { extractError } from '~/lib/error';
import { useQueryClient } from '@tanstack/react-query';
import EmailEditor from '~/components/setting/EmailEditor';

const SettingPage = () => {
  const user = useUser();
  const handleGithubLogin = () => {
    window.location.href = GITHUB_OAUTH_LOGIN_URL;
  };
  const queryClient = useQueryClient();
  const logout = useLogout();
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [nextEmail, setNextEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { mutate: updateEmail } = useUpdateEmail();

  const { mutate: updateEmailNotification } = useUpdateEmailNotification();

  const handleChangeEmailNotification = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateEmailNotification(
      { enabled: e.target.checked },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries(useGetMe.getKey());
        },
        onError: (e) => {
          const error = extractError(e);
          alert(error.message);
        },
      },
    );
  };

  const handleEditEmail = () => {
    setIsEditEmail(true);
  };

  const handleCancelEditEmail = () => {
    setIsEditEmail(false);
  };

  const handleConfirmEditEmail = () => {
    updateEmail(
      // if nextEmail is empty string, set null
      // because empty string is not valid email
      { email: nextEmail === '' ? null : nextEmail },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries(useGetMe.getKey());
          setIsEditEmail(false);
        },
        onError: (e) => {
          const error = extractError(e);
          alert(error.message);
        },
      },
    );
  };

  const handleChangeNextEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNextEmail(e.target.value);
  };

  return (
    <TabLayout>
      <Container>
        {user ? (
          <Box>
            <Text className="profile">Profile</Text>
            <Text>{user?.username}</Text>
            <Text>{user?.displayName}</Text>
            {isEditEmail ? (
              <EmailEditor
                isEmailEdit={isEditEmail}
                nextEmail={nextEmail}
                onChangeNextEmail={handleChangeNextEmail}
                onEdit={handleConfirmEditEmail}
                onCancel={handleCancelEditEmail}
              />
            ) : (
              <EmailWrapper>
                <Text>
                  Email: {user?.email || <b>현재 존재하지 않습니다.</b>}
                </Text>
                <Button
                  size="sm"
                  color="secondary"
                  shadow
                  onClick={handleEditEmail}
                >
                  Edit
                </Button>
              </EmailWrapper>
            )}
            <Toggle
              labelText="Email Notification"
              defaultChecked={user?.emailNotification}
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

const Text = styled.span`
  display: flex;
  font-size: 16px;
  width: 100%;
  color: #000;
  &.profile {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 900;
  }
  b {
    color: #ff0000;
  }
  ${mediaQuery.mobile} {
    font-size: 16px;
    &.profile {
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 900;
    }
  }
`;

const EmailWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
