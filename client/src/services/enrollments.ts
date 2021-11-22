import baseApi from './baseApi';
import { COURSE_TAG_TYPE } from '../tagTypes';

interface Enrollment {
  courseId: string;
  studentId: string;
}

interface GetStudentsEnrollmentsArgs {
  studentId: string;
}

interface AddNewEnrollmentArgs {
  courseId: string;
}
interface WithdrawArgs {
  courseId: string;
}

const enrollmentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEnrollments: build.query<Enrollment[], void>({
      query: () => {
        return {
          url: 'v1/enrollments',
          method: 'get',
        };
      },
      providesTags: [COURSE_TAG_TYPE],
    }),
    getStudentsEnrollments: build.query<
      Enrollment[],
      GetStudentsEnrollmentsArgs
    >({
      query: (data) => {
        return {
          url: `v1/enrollments?studentId=${data.studentId}`,
          method: 'get',
        };
      },
      providesTags: [COURSE_TAG_TYPE],
    }),
    enroll: build.mutation<Enrollment, AddNewEnrollmentArgs>({
      query: (data) => ({
        url: `v1/enrollments/enroll`,
        method: 'post',
        data,
      }),
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
    withdraw: build.mutation<Enrollment[], WithdrawArgs>({
      query: ({ courseId }) => {
        return {
          url: `v1/enrollments/withdraw/${courseId}`,
          method: 'delete',
        };
      },
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
  }),
});

export const {
  useGetEnrollmentsQuery,
  useGetStudentsEnrollmentsQuery,
  useEnrollMutation,
  useWithdrawMutation,
} = enrollmentsApi;
