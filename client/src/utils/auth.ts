/**
 * Get the JWT
 * @returns {string} token - The JWT from persistent storage; eventually will
 * first check global state for it as well.
 */
export const getToken = () => {
  return localStorage.getItem('token') || '';
};

/**
 * Removes the token - should ideally update global auth state as well.
 *
 */
export const clearToken = () => {
  localStorage.removeItem('token');
};
