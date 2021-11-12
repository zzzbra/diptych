import baseApi from './baseApi';
import { COURSE_TAG_TYPE } from '../tagTypes';

interface Enrollment {
  courseId: string;
  userId: string;
}

interface AddNewEnrollmentArgs {
  courseId: string;
}

const enrollmentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // getCourses: build.query<Course[], void>({
    //   query: () => ({
    //     url: 'v1/courses',
    //     method: 'get',
    //   }),
    //   providesTags: [COURSE_TAG_TYPE],
    // }),
    addNewEnrollment: build.mutation<Enrollment, AddNewEnrollmentArgs>({
      query: (data) => ({
        url: `v1/enrollments/enroll`,
        method: 'post',
        data,
      }),
      invalidatesTags: [COURSE_TAG_TYPE],
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
  // useGetCoursesQuery,
  // useGetCourseQuery,
  useAddNewEnrollmentMutation,
  // useUpdateCourseMutation,
  // useDeleteCourseMutation,
} = enrollmentsApi;
