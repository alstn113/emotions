import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import formatDate from '~/lib/formatDate';
import { PostWithStats } from '~/lib/types';

import { Avatar } from '../common';

interface Props {
  post: PostWithStats;
}

const PostCard = ({ post }: Props) => {
  const link = `/user/${post.user.username}/post/${post.slug}`;
  const postDate = formatDate(post.createdAt);

  return (
    <Card>
      <CardHeader to={link}>
        <Thumbnail src={post.thumbnail} />
      </CardHeader>
      <CardBody to={link}>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <TagList>
          {post.tags.map((tag) => (
            <div key={tag}>{tag}</div>
          ))}
        </TagList>
      </CardBody>
      <CardFooter>
        <UserInfo to={`/user/${post.user.username}`}>
          <Avatar src={post.user.profileImage} size="sm" />
          <Author>
            by <b>{post.user.username}</b> · {postDate}
          </Author>
        </UserInfo>

        <PostStatsWrapper>
          <div>좋아요 {post.postStats.likes.toLocaleString()}개</div>
          <div>댓글 {post.postStats.commentsCount.toLocaleString()}개 </div>
        </PostStatsWrapper>
      </CardFooter>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
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

const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
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
    -webkit-line-clamp: 1; // 라인수 1
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 1.2rem;
    height: 1.2rem; // line-height 가 1.2rem 이고 3라인을 자르기 때문에 height는 1.2rem * 1 = 1.2rem
  }
  p {
    margin-bottom: 1rem;
    font-size: 0.875rem;
    line-height: 1.5;

    // 3줄까지만 보이게
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; // 라인수 3
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 1.2rem;
    height: 3.6rem; // line-height 가 1.2rem 이고 3라인을 자르기 때문에 height는 1.2rem * 3 = 3.6
  }
`;

const TagList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  white-space: nowrap;
  overflow-y: scroll;
  height: 1.8rem;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    font-size: 0.7rem;
    border-radius: 0.8rem;
    background: linear-gradient(to bottom right, #f6d365, #ffc9ba);
    color: #000;
  }
`;

const CardFooter = styled.div`
  border-top: 1px solid #f1f3f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;

const PostStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  div {
    font-size: 0.7rem;
    line-height: 0.7rem;
    font-weight: 500;
    color: #999;
  }
`;

const Author = styled.div`
  font-size: 0.7rem;
  line-height: 0.7rem;
  font-weight: 500;
  color: #999;

  b {
    color: #cc6600;
    font-weight: 900;
  }
`;

const UserInfo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export default PostCard;
