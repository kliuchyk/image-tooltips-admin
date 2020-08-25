import { message } from 'antd';

const MESSAGES = {
  errors: {
    isLt2M: 'File must be smaller than 2MB!',
    isJpgOrPng: 'You can only upload JPG/PNG file!',
  },
  successUpload: 'Saved Images!',
  successDelete: 'Image Deleted!',
};

export const showErrorMsg = (filesToCheck) => {
  const isJpgOrPng = Object.values(filesToCheck).every(
    (file) => file.type === 'image/jpeg' || file.type === 'image/png'
  );
  const isLt2M = Object.values(filesToCheck).every(
    (file) => file.size / 1024 / 1024 < 2
  );

  if (!isJpgOrPng) {
    message.error(MESSAGES.errors.isJpgOrPng);
  }

  if (!isLt2M) {
    message.error(MESSAGES.errors.isLt2M);
  }
};


export const showSuccessMsg = () => {
  message.success(MESSAGES.successUpload);
};

export const showSuccessDeletionMsg = () => {
  message.success(MESSAGES.successDelete);
};
