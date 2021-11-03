import axios from 'axios';
import { getToken } from '../utils/auth';
import { UserProfile } from '../models';

// TODO: set up FE env variables
// const protocol = process.env.SERVER_PROTOCOL || 'http';
// const host = process.env.SERVER_HOST || 'localhost';
// const port = process.env.SERVER_PORT || '5000';
const protocol = 'http';
const host = 'localhost';
const port = '5000';

const profileAPI = axios.create({
  baseURL: `${protocol}://${host}:${port}/api/v1/profile`,
});

export async function getUserProfileData(): Promise<UserProfile | undefined> {
  const token = getToken();
  try {
    const { data } = await profileAPI.get<UserProfile>(``, {
      headers: {
        token,
      },
    });

    return data;
  } catch (error: any) {
    // https://hashnode.com/post/how-to-use-axios-with-typescript-ckqi62md803s28us1baqyaj4u
    // if (axios.isAxiosError(error)) {
    //   const serverError = error as AxiosError<ServerError>;
    //   if (serverError && serverError.response) {
    //     return serverError.response.data;
    //   }
    // }
  
    console.error(error.message);
    return {};

    // return { error: "Something went wrong " }
  }
}

export default profileAPI;
