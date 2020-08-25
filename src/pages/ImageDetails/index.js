import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';

import { Button } from 'antd';

import TooltipEditor from '../../containers/TooltipEditor';
import ImageDetailsComponent from '../../components/ImageDetailsComponent';
import TooltipDetails from '../../components/TooltipDetails';
import { showSuccessDeletionMsg } from '../../utils/showMessages';

export default function ImageDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const storageValues = localStorage.getItem('images');

  const filesDetails = JSON.parse(storageValues)[id];
  const { size, name, type } = filesDetails.file;
  const url = filesDetails.base64;
  const { text, bgColor, position } = filesDetails.tooltip;

  const handleUpdate = (newValue) => {
    setIsEditing(false);

    const isExisting = localStorage.getItem('images');
    const storageValues = isExisting ? JSON.parse(isExisting) : {};

    storageValues[id].tooltip = {
      text: newValue.text,
      position: newValue.position,
      bgColor: newValue.bgColor,
    };

    localStorage.setItem('images', JSON.stringify({ ...storageValues }));
  };

  const deleteImage = () => {
    const allFiles = Object.assign({}, JSON.parse(storageValues));
    delete allFiles[id];
    localStorage.setItem('images', JSON.stringify({ ...allFiles }));
    showSuccessDeletionMsg();
    history.push('/images');
  };

  return (
    <Container>
      <Title>DETAILS PAGE</Title>
      <ImageContainer>
        <Image src={url} alt={name} />
      </ImageContainer>

      <ImageDetailsComponent name={name} type={type} size={size} />

      <>
        {isEditing ? (
          <TooltipEditor
            handleUpdate={handleUpdate}
            bgColor={bgColor}
            text={text}
            position={position}
          />
        ) : (
          <TooltipDetails
            bgColor={bgColor}
            text={text}
            position={position}
            setIsEditing={setIsEditing}
          />
        )}
      </>

      <DeleteContainer>
        <SubTitle>DELETE RECORD</SubTitle>{' '}
        <Button type='primary' danger onClick={deleteImage}>
          DELETE
        </Button>
      </DeleteContainer>
    </Container>
  );
}

const SubTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  font-family: 'Barlow Semi Condensed';
  text-transform: uppercase;
  color: #b80808;
`;


const DeleteContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin: 50px 0 70px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 34px;
  font-family: 'Barlow Semi Condensed';
  margin: 20px 0 20px;
  text-align: center;
  text-transform: uppercase;
  color: #585858;
`;

const ImageContainer = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
