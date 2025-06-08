export interface IUser {
  id: number;
  token_version: number;
  is_active: boolean;
  last_login_at: string | null;
  failed_login_attempts: number;
  locked_until: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  username: string;
  img: string;
  email: string;
  password: string;
}