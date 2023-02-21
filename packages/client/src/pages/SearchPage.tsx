// components
import styled from '@emotion/styled';
import { useState } from 'react';
import { TextInput } from '~/components/common';
import TabLayout from '~/components/layouts/TabLayout';
import useDebounce from '~/hooks/useDebounce';

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedText = useDebounce<string>({ value: searchInput });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <TabLayout>
      <Container>
        <TextInput
          placeholder="검색어를 입력해주세요"
          type="text"
          value={searchInput}
          onChange={handleChangeInput}
        />
        <div></div>
        <div>{debouncedText}</div>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  font-weight: 700;
`;

export default SearchPage;
