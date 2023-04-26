/* API to fetch user data */
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getUserData = () => {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json())
    .catch(error => console.error(error));
};
