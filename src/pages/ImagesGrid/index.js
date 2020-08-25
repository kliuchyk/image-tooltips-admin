import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function ImagesGrid() {
  const isExisting = localStorage.getItem('images');
  const storageValues = isExisting ? JSON.parse(isExisting) : {};

  return (
    <>
      <Title>Images Grid</Title>

      {Object.keys(storageValues).length === 0 ? (
        <Note>You need to add images first</Note>
      ) : (
        <Grid>
          {Object.keys(storageValues).map((key) => {
            const { position, bgColor, text } = storageValues[key].tooltip;
            const { id, name } = storageValues[key].file;
            const { base64 } = storageValues[key];

            return (
              <Link to={`/details/${id}`} key={key}>
                <ImageContainer
                  // position={position}
                  className={position}
                  bgColor={bgColor}
                  data-tooltip={text}
                >
                  <Image src={base64} alt={name} />
                </ImageContainer>
              </Link>
            );
          })}
        </Grid>
      )}
    </>
  );
}

const Note = styled.div`
  text-align: center;
  font-size: 16px;
  font-family: Barlow;
  font-weight: 600;
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

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 75%;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  background: #fafafa;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  &:hover:before {
    content: attr(data-tooltip);
    color: #fafafa;
    position: absolute;
    padding: 10px;
    background: #333;
    background: ${(props) => props.bgColor};
    width: max-content;
    max-width: 100%;
    border-radius: 5px;
    text-align: center;
  }

  &.top:hover:before {
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
  }
  &.bottom:hover:before {
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  }
  &.left:hover:before {
    left: -20%;
    top: 50%;
    transform: translateY(-50%);
  }
  &.right:hover:before {
    right: -20%;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: auto;
  padding: 10px;
`;
