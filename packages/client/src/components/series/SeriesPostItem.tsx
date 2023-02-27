import { SeriesPost } from '~/lib/types';

interface Props {
  seriesPost: SeriesPost;
  index: number;
}

const SeriesPostItem = ({ seriesPost, index }: Props) => {
  return (
    <div>
      <div>{seriesPost.id}</div>
      <div>{index + 1}</div>
      <div>{seriesPost.post.title}</div>
      <div>{seriesPost.createdAt}</div>
    </div>
  );
};

export default SeriesPostItem;
