import baseApi from './baseApi';
import { COURSE_TAG_TYPE, LESSON_TAG_TYPE } from '../tagTypes';
import { Lesson } from '../models';

interface GetLessonsArgs {
  courseId: string;
}

interface GetLessonArgs {
  lessonId: string;
}

interface AddNewLessonArgs {
  courseId: string;
  title: string;
  description: string;
}

export const defaultAddNewLessonArgs = {
  title: '',
  description: '',
};

interface UpdateLessonArgs {
  courseId: string;
  lessonId: string;
  title: string;
  description: string;
}

export interface DeleteLessonArgs {
  lessonId: string;
}

const lessonsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLessons: build.query<Lesson[], GetLessonsArgs>({
      query: (data) => {
        return {
          url: 'v1/lessons',
          method: 'get',
        };
      },
      providesTags: [LESSON_TAG_TYPE],
    }),
    getLessonsInCourse: build.query<Lesson[], GetLessonsArgs>({
      query: (data) => {
        return {
          url: `v1/lessons?courseId=${data.courseId}`,
          method: 'get',
        };
      },
      providesTags: [COURSE_TAG_TYPE, LESSON_TAG_TYPE],
    }),
    getLesson: build.query<Lesson, GetLessonArgs>({
      query: ({ lessonId }) => {
        return {
          url: `v1/lessons/${lessonId}`,
          method: 'get',
        };
      },
      providesTags: [COURSE_TAG_TYPE],
    }),
    addNewLesson: build.mutation<Lesson, AddNewLessonArgs>({
      query: (data) => ({
        url: `v1/lessons`,
        method: 'post',
        data,
      }),
      invalidatesTags: [COURSE_TAG_TYPE, LESSON_TAG_TYPE],
    }),
    updateLesson: build.mutation<Lesson, UpdateLessonArgs>({
      query: ({ lessonId, title, description }) => ({
        url: `v1/lessons/${lessonId}`,
        method: 'put',
        data: { title, description },
      }),
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
    deleteLesson: build.mutation<Lesson[], DeleteLessonArgs>({
      query: ({ lessonId }) => ({
        url: `v1/lessons/${lessonId}`,
        method: 'delete',
      }),
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useGetLessonsInCourseQuery,
  useGetLessonQuery,
  useAddNewLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonsApi;
