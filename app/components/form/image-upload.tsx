import type { ChangeEvent } from 'react';
import { useState } from 'react';

enum UPLOAD_PRESET_ENUM {
  bidhubAvatar = 'bidhub_avatar',
  bidhubItem = 'bidhub_item',
}

type ImageUploadProps = {
  uploadPreset?: UPLOAD_PRESET_ENUM;
};

type Props = ImageUploadProps & React.HTMLProps<HTMLInputElement>;

type ImageUploadState = {
  fileName: string;
  image: string;
  largeImage: string;
};

export default function ImageUpload({
  uploadPreset = UPLOAD_PRESET_ENUM.bidhubItem,
  ...props
}: Props) {
  const [imageState, setImageState] = useState<ImageUploadState>();
  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', uploadPreset);

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/bidhub/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );

      const file = await res.json();
      setImageState({
        image: file.secure_url,
        largeImage: file.eager[0].secure_url,
        fileName: files[0].name,
      });
    }
  };
  return (
    <input
      type="file"
      onChange={uploadImage}
      {...props}
      value={imageState?.largeImage}
    />
  );
}
