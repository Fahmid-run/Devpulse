export interface IssuesPayload {
  title: string;
  description: string;
  type: string;
}

export type UserRole = 'contributor'| 'maintainer';