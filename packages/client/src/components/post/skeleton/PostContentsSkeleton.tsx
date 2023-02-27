// components
import styled from '@emotion/styled';
import { shine } from '~/lib/styles';

const PostContentsSkeleton = () => {
  return (
    <>
      <Title></Title>
      <TagList>
        {[1, 2, 3].map((tag) => {
          return <div key={tag}></div>;
        })}
      </TagList>
      <Body>
        <pre></pre>
      </Body>
      <Group>
        <Author></Author>
      </Group>
      <LikeButtonWrapper></LikeButtonWrapper>
    </>
  );
};

const Title = styled.div`
  height: 2.5rem;
  width: 80%;
  border-radius: 0.8rem;
  background: rgba(0, 0, 0, 0.1);
  animation: ${shine} 1s infinite;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6rem 0.8rem;
    height: 2rem;
    width: 4rem;
    border-radius: 0.8rem;
    background: rgba(0, 0, 0, 0.1);
    animation: ${shine} 1s infinite;
  }
`;

const Body = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 0.8rem;
  background: rgba(0, 0, 0, 0.1);
  animation: ${shine} 1s infinite;
`;

const Author = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  color: #999;
`;
const Group = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const LikeButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2rem;
  width: 5rem;
  border-radius: 0.8rem;
  background: rgba(0, 0, 0, 0.1);
  animation: ${shine} 1s infinite;
  margin-bottom: 1rem;
`;

export default PostContentsSkeleton;
