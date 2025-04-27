export type SignUpPayload = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    fullName: string;
    email: string;
    image: string;
    provider: string;
  };
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  code: string;
  password: string;
  passwordConfirmation: string;
};

export type ForgotPasswordResponse = {
  ok: boolean;
};

export type User = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  image: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

export type ProviderSignInPayload = {
  provider: string;
  id_token: string;
};
