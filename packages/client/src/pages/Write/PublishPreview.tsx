import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { Loader } from '~/components/common';
import { useUploadImage } from '~/hooks/queries/post';
import useWriteStore from '~/stores/useWriteStore';
import UploadImageSvg from '~/assets/vectors/upload-image.svg';
import { extractError } from '~/error';

const PublishPreview = () => {
  const { changeThumbnail } = useWriteStore();
  const { mutate, isLoading } = useUploadImage();
  const [previewImage, setPreviewImage] = useState<string>(UploadImageSvg);
  const inputEl = useRef<HTMLInputElement>(null);

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

  return (
    <Container>
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
    </Container>
  );
};
const ThumbnailImage = styled.img`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
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

export default PublishPreview;
