export interface News {
  title: string;
  body: string;
  photo: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo: string;
}

export interface Invitation {
  email: string;
  code: number;
}
