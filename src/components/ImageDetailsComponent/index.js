import React from 'react';
import styled from 'styled-components';

export default function DetailsContainer({ name, type, size }) {
  return (
    <MetaData>
      <SubTitle>Image details</SubTitle>
      <Row>
        <span>Name: </span> <span>{name}</span>
      </Row>
      <Row>
        <span>Type: </span> <span>{type}</span>
      </Row>
      <Row>
        <span>Size: </span> <span>{size}</span>
      </Row>
    </MetaData>
  );
}

const SubTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  font-family: 'Barlow Semi Condensed';
  text-transform: uppercase;
  color: #2c5696;
`;

const MetaData = styled.div`
  margin-top: 40px;
  width: 400px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  font-family: Barlow;
  font-weight: 600;
`;
