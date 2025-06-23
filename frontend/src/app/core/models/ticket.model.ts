export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}
