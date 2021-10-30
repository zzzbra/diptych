import axios from 'axios';

// TODO: set up FE env variables
const protocol = process.env.SERVER_PROTOCOL || 'http';
const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || '5000';

const authAPI = axios.create({
  baseURL: `${protocol}://${host}:${port}/api/v1/auth`,
});

// export const register = async (formData) => {
//   try {
//     const data = await authAPI.post('/register', {

//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

export default authAPI;
