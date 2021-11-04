import axios from 'axios';
import { getToken } from '../../utils/auth';

// TODO: set up FE env variables
// const protocol = process.env.SERVER_PROTOCOL || 'http';
// const host = process.env.SERVER_HOST || 'localhost';
// const port = process.env.SERVER_PORT || '5000';
const protocol = 'http';
const host = 'localhost';
const port = '5000';

const authAPI = axios.create({
  baseURL: `${protocol}://${host}:${port}/api/v1/auth`,
});

export const isAuthorized = async () => {
  try {
    const { data } = await authAPI.get('/is-authorized', {
      headers: {
        token: getToken(),
      },
    });

    return data;
  } catch (error: any) {
    console.error(error);
  }
};

export default authAPI;
