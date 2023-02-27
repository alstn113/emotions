// components
import styled from '@emotion/styled';
import { shine } from '~/lib/styles';

const PostCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Thumbnail />
      </CardHeader>
      <CardBody>
        <h3></h3>
        <p></p>
        <TagList>
          {[1, 2, 3].map((tag) => (
            <div key={tag}></div>
          ))}
        </TagList>
      </CardBody>
      <CardFooter>
        <PostStatsWrapper>
          <div></div>
          <div></div>
        </PostStatsWrapper>
        <Author></Author>
      </CardFooter>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  width: 100%;
`;

const CardHeader = styled.div``;

const Thumbnail = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(0, 0, 0, 0.1);
  animation: ${shine} 1s infinite;
`;

const CardBody = styled.div`
  padding: 1rem;
  h3 {
    margin-bottom: 0.5rem;
    height: 1.2rem;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    animation: ${shine} 1s infinite;
  }
  p {
    margin-bottom: 1rem;
    height: 3.6rem;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    animation: ${shine} 1s infinite;
  }
`;

const TagList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  height: 2rem;

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

const CardFooter = styled.div`
  border-top: 1px solid #f1f3f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const PostStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  div {
    height: 0.7rem;
    width: 2rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    animation: ${shine} 1s infinite;
  }
`;

const Author = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 0.7rem;
  width: 3rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  animation: ${shine} 1s infinite;
`;

export default PostCardSkeleton;
