import { useEffect } from 'react';

import styled from '@emotion/styled';

import useWriteStore from '~/stores/useWriteStore';

const PublishURLSetting = () => {
  const { title, slug, changeSlug } = useWriteStore();

  useEffect(() => {
    if (!title) return;
    changeSlug(title);
  }, [changeSlug, title]);

  return (
    <Container>
      <Title>URL Setting</Title>
      <SlugInput value={slug} onChange={(e) => changeSlug(e.target.value)} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Title = styled.span`
  width: 100%;
  text-align: left;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const SlugInput = styled.input`
  width: 100%;
  height: 2rem;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

export default PublishURLSetting;
