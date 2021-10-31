import axios from 'axios';
import { getToken } from '../utils/auth';

// TODO: set up FE env variables
const protocol = process.env.SERVER_PROTOCOL || 'http';
const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || '5000';

const profileAPI = axios.create({
  baseURL: `${protocol}://${host}:${port}/api/v1/profile`,
});

export async function getUserProfileData() {
  const token = getToken();
  try {
    const data = await profileAPI.get(``, {
      headers: {
        token,
      },
    });

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export default profileAPI;
