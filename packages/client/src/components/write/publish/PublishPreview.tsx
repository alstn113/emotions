import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '~/components/common';
import { useUploadImage } from '~/hooks/queries/post';
import useWriteStore from '~/stores/useWriteStore';
import UploadImageSvg from '~/assets/vectors/upload-image.svg';
import { extractError } from '~/lib/error';
import { css } from '@emotion/react';
import removeMarkdown from 'remove-markdown';

const PublishPreview = () => {
  const { description, body, changeThumbnail, changeDescription, thumbnail } =
    useWriteStore();
  const { mutate, isLoading } = useUploadImage();
  const [previewImage, setPreviewImage] = useState<string>(
    thumbnail ?? UploadImageSvg,
  );
  const inputEl = useRef<HTMLInputElement>(null);
  const mounted = useRef(false);

  const handleUploadImage = () => {
    const image = (inputEl.current?.files as FileList)[0];
    mutate(image, {
      onSuccess: (thumbnail) => {
        changeThumbnail(thumbnail);
        setPreviewImage(thumbnail);
      },
      onError: (e) => {
        const error = extractError(e);
        alert(error.message);
        changeThumbnail(null);
        setPreviewImage(UploadImageSvg);
      },
    });
  };

  const handleButtononClick = () => {
    inputEl.current?.click();
  };

  const onDescriptionInputKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // 처음에 한 번만 description이 없을 때 body를 description으로 설정
  useEffect(() => {
    if (mounted.current) return;

    if (!description) {
      const bodyWithoutMd = removeMarkdown(body);
      changeDescription(bodyWithoutMd);
    }

    mounted.current = true;
  }, [changeDescription, body, description]);

  return (
    <Container>
      <Title>Post Preview</Title>
      <InageWrapper>
        {isLoading ? (
          <Loader size="lg" color="success" />
        ) : (
          <ThumbnailImage src={previewImage} onClick={handleButtononClick} />
        )}
        <input
          type="file"
          ref={inputEl}
          style={{ display: 'none' }}
          onChange={handleUploadImage}
        />
      </InageWrapper>
      <DescriptionInput
        value={description}
        onChange={(e) => changeDescription(e.target.value)}
        onKeyDown={onDescriptionInputKeyDown}
      />
      <DescriptionLimit limit={description.length === 200}>
        {description.length}/200
      </DescriptionLimit>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Title = styled.span`
  width: 100%;
  text-align: left;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const ThumbnailImage = styled.img`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const InageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 250px;
  width: 100%;
  height: 100%;
  background: #e9ecef;
  border-radius: 10px;
`;

const DescriptionInput = styled.textarea`
  resize: none;
  width: 100%;
  border: none;
  outline: none;
  box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
  background: #fff;
  color: #000;
  line-height: 1.5;
  font-size: 0.875rem;
  height: 7.375rem;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
`;

const DescriptionLimit = styled.span<{ limit: boolean }>`
  width: 100%;
  text-align: right;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #868e96;
  ${({ limit }) =>
    limit &&
    css`
      color: #dc3545;
    `}
`;

export default PublishPreview;
