import styled from '@emotion/styled';

interface Props {
  count: number;
}

const SearchResultInfto = ({ count }: Props) => {
  if (count === 0)
    return <SearchResultText>검색 결과가 없습니다.</SearchResultText>;

  return (
    <SearchResultText>
      총 <b>{count}</b>개의 글을 찾았습니다.
    </SearchResultText>
  );
};

const SearchResultText = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  b {
    font-weight: 900;
    color: #ffb62f;
  }
`;

export default SearchResultInfto;
