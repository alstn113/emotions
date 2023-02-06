import styled from '@emotion/styled';
import { useRef, useState } from 'react';

const PublishPreview = () => {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>();
  const inputEl = useRef<HTMLInputElement>(null);
  const handleChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e: any) => {
        setPreviewImage(e.target.result);
      };
      setImage(file);
    } else {
      setPreviewImage(undefined);
      setImage(undefined);
    }
  };

  const handleButtononClick = () => {
    inputEl.current?.click();
  };

  return (
    <Container>
      <ThumbnailImage src={previewImage} onClick={handleButtononClick} />
      <input
        type="file"
        ref={inputEl}
        style={{ display: 'none' }}
        onChange={handleChangeThumbnail}
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
