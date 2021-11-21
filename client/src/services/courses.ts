import baseApi from './baseApi';
import { COURSE_TAG_TYPE } from '../tagTypes';
import { Course } from '../models';

interface GetCoursesOfferedByTeacherArgs {
  userId: string;
}

interface GetCourseArgs {
  courseId: string;
}

interface AddNewCourseArgs {
  description: string;
}

interface UpdateCourseArgs {
  courseId: string;
  description: string;
}

interface DeleteCourseArgs {
  courseId: string;
}

const coursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCoursesOfferedByTeacher: build.query<
      Course[],
      GetCoursesOfferedByTeacherArgs
    >({
      query: ({ userId }) => ({
        url: `v1/courses?userId=${userId}`,
        method: 'get',
      }),
      providesTags: [COURSE_TAG_TYPE],
    }),
    getCourses: build.query<Course[], void>({
      query: () => ({
        url: 'v1/courses',
        method: 'get',
      }),
      providesTags: [COURSE_TAG_TYPE],
    }),
    getCourse: build.query<Course, GetCourseArgs>({
      query: ({ courseId }) => {
        return {
          url: `v1/courses/${courseId}`,
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
      query: ({ courseId, description }) => ({
        url: `v1/courses/${courseId}`,
        method: 'put',
        data: { description },
      }),
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
    deleteCourse: build.mutation<Course[], DeleteCourseArgs>({
      query: ({ courseId }) => ({
        url: `v1/courses/${courseId}`,
        method: 'delete',
      }),
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCoursesOfferedByTeacherQuery,
  useGetCourseQuery,
  useAddNewCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
