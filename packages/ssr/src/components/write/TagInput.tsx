import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import useWriteStore from '~/stores/useWriteStore';

const TagInput = () => {
  const { tags, changeTags } = useWriteStore();
  const [value, setValue] = useState<string>('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addTag = useCallback(
    (tag: string) => {
      const trimedTag = tag.trim();
      if (trimedTag === '' || tags.includes(trimedTag)) return;
      changeTags([...tags, trimedTag]);
      setValue('');
    },
    [changeTags, tags],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // 한글 이중 입력 무시
      if (e.nativeEvent.isComposing) return;

      if (e.key === 'Backspace' && value === '') {
        changeTags(tags.slice(0, -1)); // remove last tag
        return;
      }

      if (['Enter', ','].includes(e.key)) {
        e.preventDefault();
        addTag(value);
      }
    },
    [addTag, changeTags, tags, value],
  );

  const handleRemoveTag = useCallback(
    (tag: string) => {
      const nextTags = tags.filter((t) => t !== tag);
      changeTags(nextTags);
    },
    [changeTags, tags],
  );

  return (
    <Container>
      {tags.map((tag) => {
        return (
          <TagItem key={tag} onClick={() => handleRemoveTag(tag)}>
            {tag}
          </TagItem>
        );
      })}
      <StyledInput
        type="text"
        placeholder="태그를 입력하세요"
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        value={value}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const TagItem = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 2rem;
  border-radius: 20px;
  padding: 0 1rem;
  background: rgba(0, 0, 0, 0.1);
  color: #000000;
  margin-right: 0.75rem;
  transition: ease-in 0.1s;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  margin-bottom: 0.75rem;
`;

const StyledInput = styled.input`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
`;

export default TagInput;
