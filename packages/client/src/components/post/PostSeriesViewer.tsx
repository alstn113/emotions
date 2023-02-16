import styled from '@emotion/styled';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import useDisclosure from '~/hooks/useDisclosure';
import { PostWithStats, Series } from '~/lib/types';

interface Props {
  post: PostWithStats;
  series: Series;
}

const PostSeriesViewer = ({ post, series }: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  const tiggerVariants: Variants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.3,
        delayChildren: 0.05,
        staggerChildren: 0.05,
      },
    },
    collapsed: {
      opacity: 0,
      height: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    collapsed: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Container>
      <SeriesName>{series.name}</SeriesName>
      <AnimatePresence initial={false}>
        {isOpen && (
          <Collapse
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={tiggerVariants}
          >
            {series.seriesPosts.map((seriesPost) => {
              return (
                <motion.div key={seriesPost.id} variants={itemVariants}>
                  <CollapseItem
                    to={`/user/${post.user.username}/post/${seriesPost.post.slug}`}
                  >
                    {seriesPost.index}. {seriesPost.post.title}
                  </CollapseItem>
                </motion.div>
              );
            })}
          </Collapse>
        )}
        <CollapseButton
          initial={false}
          animate={{ backgroundColor: isOpen ? '#bebebe' : '#858585' }}
          onClick={onToggle}
        >
          {isOpen ? '숨기기' : '목록 보기'}
        </CollapseButton>
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  border-radius: 4px;
  background-color: #f5f5f5;
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.1);
`;

const SeriesName = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Collapse = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  transform-origin: top center;
`;
const CollapseItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1rem;
  width: 100%;
  height: 2.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #eaeaea;
  }
  &.active {
    color: #0055ff;
  }
  overflow: hidden;
`;

const CollapseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  height: 40px;
  width: 100%;
  margin-top: 1rem;
`;

export default PostSeriesViewer;
