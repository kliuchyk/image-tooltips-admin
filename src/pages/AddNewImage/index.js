import React from 'react';
import styled from 'styled-components';

import AddImageForm from '../../components/AddImageForm';

export default function AddNewImage() {
  return (
    <Container>
      <AddImageForm />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

