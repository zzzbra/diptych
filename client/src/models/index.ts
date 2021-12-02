// TODO break up into {name}.interface.ts
import { AxiosRequestConfig } from 'axios';

// Base API
// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
export interface AxiosArgs {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  headers?: AxiosRequestConfig['headers'];
}

export interface MyAxiosResponse {
  data: any;
}

export interface MyAxiosErrorResponse {
  code?: string;
  message?: string;
}

// API response (DAOs)
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

export interface Review {
  reviewId: string;
  cardId: string;
  lessonId: string;
  userId: string;
  dueDate: string;
  rating: number;
}
