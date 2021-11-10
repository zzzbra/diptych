import { COURSE_TAG_TYPE } from '../tagTypes';
// import axios from 'axios';

import baseApi from './baseApi';
// import { getToken } from '../../features/auth/utils';
import { Course } from '../../models';

interface GetCourseArgs {
  id: string;
}

interface AddNewCourseArgs {
  description: string;
}

interface UpdateCourseArgs {
  id: string;
  description: string;
}

interface DeleteCourseArgs {
  id: string;
}

const coursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query<Course[], void>({
      query: () => ({
        url: 'v1/courses',
        method: 'get',
      }),
      providesTags: [COURSE_TAG_TYPE],
    }),
    getCourse: build.query<Course, GetCourseArgs>({
      query: ({ id }) => {
        return {
          url: `v1/courses/${id}`,
          method: 'get',
        };
      },
      providesTags: [COURSE_TAG_TYPE],
    }),
    addNewCourse: build.mutation<Course, AddNewCourseArgs>({
      query: (data) => ({
        url: 'v1/courses',
        method: 'post',
        data,
      }),
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
    updateCourse: build.mutation<Course, UpdateCourseArgs>({
      query: ({ id, description }) => ({
        url: `v1/courses/${id}`,
        method: 'put',
        data: { description },
      }),
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
    deleteCourse: build.mutation<Course[], DeleteCourseArgs>({
      query: ({ id }) => ({
        url: `v1/courses/${id}`,
        method: 'delete',
      }),
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddNewCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
