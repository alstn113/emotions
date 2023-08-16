import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import reorder from '~/lib/reorder';
import { SeriesPost } from '~/lib/types';

import SeriesPostItem from './SeriesPostItem';

interface Props {
  seriesPosts: SeriesPost[];
  onChangeSeriesOrder: (order: string[]) => void;
}

const SeriesEditor = ({ seriesPosts, onChangeSeriesOrder }: Props) => {
  const [tempSeriesPosts, setTempSeriesPosts] = useState(seriesPosts);

  useEffect(() => {
    onChangeSeriesOrder(tempSeriesPosts.map((item) => item.id));
  }, [onChangeSeriesOrder, tempSeriesPosts]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.index === source.index) return;

    setTempSeriesPosts((prev) => {
      return reorder(prev, source.index, destination.index);
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="drop">
        {(provided, snapshot) => (
          <DroppableBlock
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tempSeriesPosts?.map((seriesPost, index) => {
              return (
                <Draggable
                  key={seriesPost.id}
                  draggableId={seriesPost.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <DraggableBlock
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    >
                      <SeriesPostItem
                        seriesPost={seriesPost}
                        // index starts from 1
                        index={index + 1}
                      />
                    </DraggableBlock>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </DroppableBlock>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const DroppableBlock = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background-color 0.1s ease-in-out;
  background-color: ${(props) =>
    props.isDraggingOver ? '#e8e8e8' : '#dcdbdb'};
  border-radius: 10px;
  padding: 2rem;
  margin-top: 2rem;
`;

const DraggableBlock = styled.div<{ isDragging: boolean }>`
  user-select: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  padding: 2rem;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  ${(props) =>
    props.isDragging
      ? css`
          opacity: 0.6;
        `
      : css`
          opacity: 1;
        `}

  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: #ebebeb;
  }
`;

export default SeriesEditor;
