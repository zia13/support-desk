export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'assignee' | 'admin';
}
