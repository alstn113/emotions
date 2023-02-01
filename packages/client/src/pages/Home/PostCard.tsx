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
  }
  p {
    margin: 0px 0px 1.5rem;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    height: 3.9375rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CardFooter = styled.div`
  display: flex;
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
