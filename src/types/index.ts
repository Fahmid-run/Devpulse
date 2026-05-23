export interface IssuesPayload {
  title: string;
  description: string;
  type: string;
  status?: string;
}

export default interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export type UserRole = 'contributor' | 'maintainer';

