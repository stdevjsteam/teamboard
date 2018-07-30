import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import logo from './img/logo.png';
import name from './img/name.png';

const Wrapper = styled.View`
  flex: 1;
  background: #fafafa;
  justify-content: center;
  align-items: center;
`;

const Name = styled.Image`
  margin-top: 30;
`;

const Splash = () => (
  <Wrapper>
    <Image source={logo} />
    <Name source={name} />
  </Wrapper>
);

export default Splash;
