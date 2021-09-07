export interface TokenModel {
  token: string;
  validTo: Date;
  userId: string;
  username: string;
  roles: string[];
  photoUrl: string;
}
