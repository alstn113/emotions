// components
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { TextInput } from '~/components/common';
import PostCard from '~/components/home/PostCard';
import TabLayout from '~/components/layouts/TabLayout';
import SearchResultInfto from '~/components/search/SearchResultInfto';
import { useGetSearchPosts } from '~/hooks/queries/post';
import useDebounce from '~/hooks/useDebounce';
import { mediaQuery } from '~/lib/styles';

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedText = useDebounce<string>({ value: searchInput });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const { data: posts } = useGetSearchPosts(debouncedText, {
    enabled: !!debouncedText,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TabLayout>
      <Container>
        <TextInput
          placeholder="검색어를 입력해주세요"
          type="text"
          value={searchInput}
          onChange={handleChangeInput}
        />
        {posts?.posts && <SearchResultInfto count={posts?.count} />}
        <ListWrapper>
          {posts?.posts.map((post) => (
            <PostCard key={post?.id} post={post} />
          ))}
        </ListWrapper>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  padding: 16px;
  ${mediaQuery.tablet} {
    width: 700px;
    margin: 0 auto;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  gap: 1rem;
  width: 100%;
`;

export default SearchPage;
