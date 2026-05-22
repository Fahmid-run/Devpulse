export interface IssuesPayload {
  title: string;
  description: string;
  type: string;
  status?: string;
}

export type UserRole = 'contributor' | 'maintainer';

