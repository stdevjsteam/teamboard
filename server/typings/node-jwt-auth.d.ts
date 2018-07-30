declare module 'node-jwt-auth' {
  import { SignOptions } from 'jsonwebtoken';

  namespace Auth {
    type Config = {
      accessSecret: string;
      refreshSecret: string;
      mapPayloadToUser: (payload: Payload) => Promise<User>;
      mapUserToPayload: (user: User) => Payload;
      mapUserToHashed: (user: User) => string;
      accessSingingOptions?: SignOptions;
      refreshSingingOptions?: SignOptions;
    };

    type Payload = { [key: string]: any };
    type User = { [key: string]: any };
    type Token = string;
  }

  class Auth {
    config: Auth.Config;
    constructor(config: Auth.Config);
    generateAccessToken: (user: Auth.User) => Auth.Token;
    generateRefreshToken: (user: Auth.User) => Auth.Token;
    verifyAccessToken: (accessToken: string) => Promise<Auth.Payload>;
    refreshAccessToken: (refreshToken: string) => Promise<Auth.Token>;
  }

  export default Auth;
}
