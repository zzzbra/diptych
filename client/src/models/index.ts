// move into {name}.interface.ts

// API response
export interface Todo {
  todo_id: string,
  user_id: string,
  description: string,
}

// API Response
export interface UserProfile {
  user_id?: string,
  user_name?: string,
  user_email?: string,
  user_is_teacher?: string,
}

export interface TopLevelComponentProps {
  isAuthenticated: boolean,
  // setIsAuthenticated: React.Dispatch<React.SetStateAction<never[]>>,
  setIsAuthenticated: (authStatus: boolean) => void,
}

// move into {name}.type.ts
export type ServerData = {
  data: any;
}

export type ServerError = {
  error: string,
}

