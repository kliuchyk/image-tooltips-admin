import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { showErrorMsg, showSuccessMsg } from '../../utils/showMessages';

const { Text } = Typography;

export default function AddImageForm() {
  const [filesToUpload, updateFilesList] = useState([]);

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const { id, name, size, type } = file;
        resolve({
          file: {
            id,
            name,
            size,
            type,
          },
          base64: reader.result,
        });
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const saveImages = async () => {
    if (filesToUpload.length < 1) return;

    const isExisting = localStorage.getItem('images');
    const storageValue = isExisting ? JSON.parse(isExisting) : [];
    const promises = filesToUpload.map((file) => toBase64(file));

    // working copy with object
    const promiseResult = await Promise.all(promises).then((data) =>
      data.reduce((previousValue, currentValue) => {
        currentValue.tooltip = {
          bgColor: '#333',
          text: currentValue.file.name,
          position: 'top'
        };
        previousValue[currentValue.file.id] = { ...currentValue };
        return previousValue;
      }, {})
    );

    // version with an array
    // const promiseResult = await Promise.all(promises).then((data) => data);

    localStorage.setItem(
      'images',
      JSON.stringify({ ...storageValue, ...promiseResult })
    );

    updateFilesList([]);
    showSuccessMsg();
  };

  const checkIfValid = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;

    return isJpgOrPng && isLt2M ? true : false;
  };

  const handleChange = async (e) => {
    const validatedFiles = Object.values(e.target.files)
      .map((file) => {
        file.isValid = checkIfValid(file);
        file.id = uuidv4();
        return file;
      })
      .filter((file) => file.isValid);

    updateFilesList([...filesToUpload, ...validatedFiles]);
    showErrorMsg(e.target.files);
  };

  const deleteFile = (id) =>
    updateFilesList(filesToUpload.filter((file) => file.id !== id));

  const hasInvalidFiles = filesToUpload.some((file) => !file.isValid);

  const showFilesList = filesToUpload.map(({ id, isValid, name }) => (
    <ListItem type={isValid ? 'secondary' : 'danger'} key={id}>
      {name}{' '}
      <DeleteOutlined
        style={{ color: isValid ? 'secondary' : 'danger' }}
        onClick={() => deleteFile(id)}
      />
    </ListItem>
  ));

  return (
    <>
      <Title>ADD NEW IMAGE</Title>
      <Prerequisite>
        <Text type='secondary'>
          You can upload only image files that meet the following requirenments:
        </Text>
        <Text type='secondary'>- smaller than 2MB</Text>
        <Text type='secondary'>- JPG/PNG files</Text>
      </Prerequisite>
      <UploadComponent htmlFor='upload'>
        Upload file
        <input type='file' id='upload' multiple onChange={handleChange} />
      </UploadComponent>

      {filesToUpload.length > 0 && <FilesList>{showFilesList}</FilesList>}

      <FlexContainer>
        <Button
          type='primary'
          size='large'
          disabled={filesToUpload.length === 0 || hasInvalidFiles}
          onClick={saveImages}
        >
          Save
        </Button>
      </FlexContainer>
    </>
  );
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FilesList = styled(FlexContainer)`
  flex-direction: column;
  width: 280px;
  margin-bottom: 30px;
`;

const ListItem = styled(Text)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 7px;
  transition: all 0.3s;

  &:hover {
    background: #eee;
  }
`;

const Prerequisite = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 34px;
  font-family: 'Barlow Semi Condensed';
  margin: 20px 0 0;
  color: #585858;
`;

const UploadComponent = styled.label`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  height: 46px;
  border-radius: 4px;
  border: 2px dashed #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #1890ff;
    border-color: #1890ff;
  }

  input {
    display: none;
  }
`;
