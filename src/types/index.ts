export type UserRole = 'student' | 'teacher' | 'guest';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  created_at: string;
}

export interface Experiment {
  id: string;
  title: string;
  type: 'chemistry' | 'physics' | 'biology' | 'mathematics';
  description: string;
  completed: boolean;
  user_id: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_by: string;
  assigned_to: string;
  due_date: string;
  status: 'pending' | 'completed' | 'graded';
  grade?: number;
  created_at: string;
}