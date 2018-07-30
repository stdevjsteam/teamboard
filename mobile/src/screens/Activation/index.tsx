import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import building from './img/building.png';
import Button from 'components/ui/Button';
import TextInput from 'components/ui/TextInput';

const Wrapper = styled.View`
  flex: 1;
  background: #fafafa;
  align-items: center;
  justify-content: space-between;
`;

const Welcome = styled.Text`
  margin-top: 20%;
  font-size: 24;
  font-family: Roboto;
  color: #000;
`;

const WelcomeContainer = styled.View`
  align-items: center;
`;

const Building = styled.Image`
  margin-top: 20%;
`;

const ControlsContainer = styled.View`
  margin-bottom: 30;
  background: #fff;
  width: 95%;
  border-radius: 10;
  height: 25%;
  box-shadow: 0px 0px 5px rgba(110, 110, 110, 1);
  overflow: hidden;
  align-items: center;
`;

const InputContainer = styled.View`
  width: 80%;
  height: 70%;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  height: 30%;
  width: 100%;
`;

const Splash = () => (
  <Wrapper>
    <WelcomeContainer>
      <Welcome>{'Welcome'.toUpperCase()}</Welcome>
      <Building source={building} />
    </WelcomeContainer>
    <ControlsContainer>
      <InputContainer>
        <TextInput placeholder="Enter the activation code" />
      </InputContainer>
      <ButtonContainer>
        <Button onPress={() => {}}>GO</Button>
      </ButtonContainer>
    </ControlsContainer>
  </Wrapper>
);

export default Splash;
