import styled from '@emotion/styled';

import formatDate from '~/lib/formatDate';
import { SeriesPost } from '~/lib/types';

interface Props {
  seriesPost: SeriesPost;
  index: number;
}

const SeriesPostItem = ({ seriesPost, index }: Props) => {
  return (
    <div>
      <Name>
        <b>{index}.</b> {seriesPost.post.title}
      </Name>
      <Description>{seriesPost.post.description}</Description>
      <CreatedAt>생성일: {formatDate(seriesPost.post.createdAt)}</CreatedAt>
    </div>
  );
};

const Name = styled.div`
  font-size: 1.2rem;
  b {
    font-weight: 800;
  }
`;

const Description = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #666;
  line-height: 1.2;
`;

const CreatedAt = styled.div`
  text-align: right;
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #666;
`;

export default SeriesPostItem;
