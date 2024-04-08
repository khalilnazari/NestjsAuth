export interface PayloadType {
  email: string;
  id: string;
  role: string;
}

export type Enable2FAType = {
  secret: string;
};

export type SignErrorType = {
  message: string;
  error: string;
  statusCode: number;
};
