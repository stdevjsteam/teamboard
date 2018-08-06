import { Platform } from 'react-native';
import styled from 'styled-components/native';

const isIOS = Platform.OS === 'ios';

const ControlBox = styled.View`
  background-color: ${isIOS ? '#fafafa' : '#fff'};
  width: 95%;
  border-radius: 8;
  overflow: hidden;
  align-items: center;
  justify-content: flex-end;
  elevation: 20;
`;

const Inputs = styled.View`
  justify-content: center;
  margin-top: ${isIOS ? 30 : 50};
  margin-bottom: ${isIOS ? 10 : 20};
  width: 100%;
  align-items: center;
`;

const InputWrapper = styled.View`
  margin-bottom: ${isIOS ? 20 : 30};
  width: ${isIOS ? '100%' : '80%'};
`;

(ControlBox as any).Inputs = Inputs;
(ControlBox as any).InputWrapper = InputWrapper;

export default ControlBox;
