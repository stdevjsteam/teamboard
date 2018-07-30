import jwtDecode from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'acst';
const REFRESH_TOKEN_KEY = 'rfrt';

type Tokens = {
  refreshToken: string;
  accessToken: string;
};

export const isAuthenticated = () => {
  const { accessToken, refreshToken } = getTokens();

  try {
    jwtDecode(accessToken);
    jwtDecode(refreshToken);

    return true;
  } catch (e) {
    removeTokens();
    return false;
  }
};

export const getTokens = (): Tokens => ({
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY)!,
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY)!
});

export const setTokens = (tokens: Tokens) => {
  const { accessToken, refreshToken } = tokens;

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
