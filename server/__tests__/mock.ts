import { internet } from 'faker';

export const generateUser = () => ({
  email: internet.email(),
  password: internet.password()
});

export default null;
