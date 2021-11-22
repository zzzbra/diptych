// move into {name}.interface.ts

// API response
export interface Course {
  courseId: string;
  userId: string;
  description: string;
}

export interface Lesson {
  lessonId: string;
  courseId: string;
  title: string;
  description: string;
}

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

export interface User {
  userId: string;
  userName: string;
  userEmail: string;
  userIsTeacher: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}
export interface LessonOverviewArgs {
  courseId: string;
  lessonId: string;
}

export interface Card {
  cardId: string;
  lessonId: string;
  prevCardId?: string;
  front: string;
  back?: string;
  isQuestionCard: boolean;
}
