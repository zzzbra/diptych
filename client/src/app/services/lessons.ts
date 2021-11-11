import baseApi from './baseApi';
import { COURSE_TAG_TYPE, LESSON_TAG_TYPE } from '../tagTypes';
import { Lesson } from '../../models';

interface GetLessonsArgs {
  courseId: string;
}

// interface GetLessonArgs {
//   id: string;
// }

interface AddNewLessonArgs {
  courseId: string;
  title: string;
  description: string;
}

export const defaultAddNewLessonArgs = {
  title: '',
  description: '',
};

// interface UpdateLessonArgs {
//   id: string;
//   title: string;
//   description: string;
// }

// interface DeleteLessonArgs {
//   id: string;
// }

const lessonsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLessons: build.query<Lesson[], GetLessonsArgs>({
      query: (data) => {
        return {
          url: `v1/courses/${data.courseId}/lessons`,
          method: 'get',
        };
      },
      providesTags: [COURSE_TAG_TYPE, LESSON_TAG_TYPE],
    }),
    // getCourse: build.query<Course, GetCourseArgs>({
    //   query: ({ id }) => {
    //     return {
    //       url: `v1/courses/${id}`,
    //       method: 'get',
    //     };
    //   },
    //   providesTags: [COURSE_TAG_TYPE],
    // }),
    addNewLesson: build.mutation<Lesson, AddNewLessonArgs>({
      query: (data) => ({
        url: `v1/courses/${data.courseId}/lessons`,
        method: 'post',
        data,
      }),
      invalidatesTags: [COURSE_TAG_TYPE, LESSON_TAG_TYPE],
    }),
    // updateCourse: build.mutation<Course, UpdateCourseArgs>({
    //   query: ({ id, description }) => ({
    //     url: `v1/courses/${id}`,
    //     method: 'put',
    //     data: { description },
    //   }),
    //   invalidatesTags: [COURSE_TAG_TYPE],
    // }),
    // deleteCourse: build.mutation<Course[], DeleteCourseArgs>({
    //   query: ({ id }) => ({
    //     url: `v1/courses/${id}`,
    //     method: 'delete',
    //   }),
    //   invalidatesTags: [COURSE_TAG_TYPE],
    // }),
  }),
});

export const {
  useGetLessonsQuery,
  // useGetCourseQuery,
  useAddNewLessonMutation,
  // useUpdateCourseMutation,
  // useDeleteCourseMutation,
} = lessonsApi;
