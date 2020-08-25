import React, { useState } from 'react';
import styled from 'styled-components';
import { TwitterPicker } from 'react-color';

import { Button, Input } from 'antd';

export default function TooltipEditor({
  handleUpdate,
  bgColor,
  text,
  position,
}) {
  const [ttBgColor, settBgColor] = useState(bgColor);
  const [ttText, settText] = useState(text);
  const [ttPosition, settPosition] = useState(position);

  const handleColorChange = (color) => {
    settBgColor(color.hex);
  };

  return (
    <>
      {' '}
      <MetaData>
        <SubTitle>Customise tooltip</SubTitle>
        <Row>
          <span>Color: </span>{' '}
          <TwitterPicker
            color={ttBgColor}
            onChangeComplete={handleColorChange}
            triangle="hide"
            width="75%"
          />
        </Row>
        <Row>
          <span>Text: </span>{' '}
          <StyledInput
            value={ttText}
            onChange={(e) => settText(e.target.value)}
          />
        </Row>
        <Row>
          <span>Position: </span>{' '}
          <StyledSelect
            value={ttPosition}
            onChange={(e) => settPosition(e.target.value)}
          >
            <option value='top'>Top</option>
            <option value='bottom'>Bottom</option>
            <option value='left'>Left</option>
            <option value='right'>Right</option>
          </StyledSelect>
        </Row>
      </MetaData>
      <Btn
        type='primary'
        size='middle'
        onClick={() =>
          handleUpdate({
            bgColor: ttBgColor,
            text: ttText,
            position: ttPosition,
          })
        }
      >
        Save Changes
      </Btn>
    </>
  );
}

const StyledInput = styled(Input)`
  max-width: 75%;
`;

const StyledSelect = styled.select`
  width: 75%;
  outline: none;
  padding: 5px;
`;

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
  margin-bottom: 20px;
`;
