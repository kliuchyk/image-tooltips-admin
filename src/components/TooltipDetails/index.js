import React from 'react';
import styled from 'styled-components';

import { Button } from 'antd';

export default function TooltipDetails({
  bgColor,
  text,
  position,
  setIsEditing,
}) {
  return (
    <>
      <MetaData>
        <SubTitle>Tooltip details</SubTitle>
        <Row>
          <span>Color: </span> <span>{bgColor}</span>
        </Row>
        <Row>
          <span>Text: </span> <span>{text}</span>
        </Row>
        <Row>
          <span>Position: </span> <span>{position}</span>
        </Row>
      </MetaData>

      <Btn type='primary' size='middle' onClick={() => setIsEditing(true)}>
        Change tooltip
      </Btn>
    </>
  );
}

const Btn = styled(Button)`
  margin-top: 20px;
  text-transform: uppercase;
  font-weight: bold;
`;

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
