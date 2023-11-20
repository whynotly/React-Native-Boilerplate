export type AccessToken = {
  token: string;
  expires: string;
};

export type RefreshToken = {
  token: string;
  expires: string;
};

export type Tokens = {
  access: AccessToken;
  refresh: RefreshToken;
};
