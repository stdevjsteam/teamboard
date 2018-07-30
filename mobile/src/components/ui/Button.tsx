import React, { ReactChild } from 'react';
import styled from 'styled-components/native';

const ButtonWrapper = styled.TouchableOpacity`
  background: #0c77f2;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: Roboto;
  font-size: 16;
  font-weight: bold;
`;

export default ({ children, ...props }: { children: ReactChild }) => (
  <ButtonWrapper {...props}>
    <ButtonText>{children}</ButtonText>
  </ButtonWrapper>
);
