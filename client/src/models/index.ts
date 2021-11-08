// move into {name}.interface.ts

// API response
export interface Todo {
  todoId: string;
  userId: string;
  description: string;
}

export type TodosResponse = Todo[];

export interface LoginParameters {
  email: string;
  password: string;
}

// Request params
export interface RegistrationParameters {
  name: string;
  email: string;
  password: string;
  isTeacher: boolean;
}

export interface UserProfile {
  userId: string;
  userName: string;
  userEmail: string;
  userIsTeacher: boolean;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
}

export interface ApiErrorResponse {
  status?: any; // number | string ?
  data?: any;
}

export interface IsAuthenticatedResponse {
  isAuthenticated: boolean;
}
