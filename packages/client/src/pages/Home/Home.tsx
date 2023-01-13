import styled from '@emotion/styled';
import { GithubIcon } from '~/components/vectors';
import { API } from '~/constants';
const Home = () => {
  const handleGithubLogin = () => {
    window.location.href = API.GITHUB_AUTH;
  };
  return (
    <Container>
      <GithubLoginButton onClick={handleGithubLogin}>
        <GithubIcon width="24px" height="24px" fill="#fff" />
        <span>Login With Github</span>
      </GithubLoginButton>
    </Container>
  );
};

const GithubLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  background-color: #24292e;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  outline: none;
  transition: 0.7s;
  span {
    margin-left: 1rem;
  }

  &:hover {
    background-color: #2f363d;
  }
`;

const Container = styled.div`
  margin: auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 300px;
  border-radius: 20px;
  // grassmorphism
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export default Home;
