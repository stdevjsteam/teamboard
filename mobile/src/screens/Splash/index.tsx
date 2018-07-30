import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
console.log(styled);

const Wrapper = styled.View`
  flex: 1;
  background: #fafafa;
`;

const Splash = () => (
  <Wrapper>
    <Text>SplashSplashSplashSplashSplash</Text>
  </Wrapper>
);

export default Splash;
