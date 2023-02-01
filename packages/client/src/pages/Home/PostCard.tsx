// react
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { PostWithStats } from '~/types';

interface Props {
  post: PostWithStats;
}

const PostCard = ({ post }: Props) => {
  return (
    <Card>
      <CardHeader to={`/post/${post.id}`}>
        <Thumbnail />
      </CardHeader>
      <CardBody to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </CardBody>
      <CardFooter>
        <Author>Authored By {post.user.username}</Author>
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
  transition: all 0.2s ease 0s;
  &:hover {
    box-shadow: rgb(0 0 0 / 12%) 0px 8px 32px 0px;
    transform: translateY(-6px);
  }
`;

const CardHeader = styled(Link)``;

const Thumbnail = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(to right bottom, #f6d365, #ffc9ba);
`;

const CardBody = styled(Link)`
  padding: 1rem;
  h3 {
    font-size: 16px;
    line-height: 16px;
    font-weight: 600;
    margin-bottom: 0.5rem;

    // 3줄까지만 보이게
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; // 라인수
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 1.2rem;
    height: 1.2rem; // line-height 가 1.2rem 이고 3라인을 자르기 때문에 height는 1.2rem * 1 = 1.2rem
  }
  p {
    margin: 0px 0px 1.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    height: 3.9375rem;

    // 3줄까지만 보이게
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; // 라인수
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 1.2rem;
    height: 3.6rem; // line-height 가 1.2rem 이고 3라인을 자르기 때문에 height는 1.2rem * 3 = 3.6
  }
`;

const CardFooter = styled.div`
  border-top: 1px solid #f1f3f5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
`;

const Author = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.7rem;
  line-height: 0.7rem;
`;

export default PostCard;
