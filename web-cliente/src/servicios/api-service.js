import axios from 'axios';

const baseURL = 'http://localhost:3030/api'; // Replace this with your API base URL

const apiService = axios.create({
  baseURL,
  timeout: 10000, // Adjust the timeout as needed
});

// Add a request interceptor to set headers or perform other tasks before sending the request
apiService.interceptors.request.use(
  (config) => {
    // Here you can set headers, tokens, or perform any other request modification
    const user = JSON.parse(localStorage.getItem('user') || '');

    if (user?.token?.accessToken) {
      config.headers['Authorization'] = `Bearer ${user.token.accessToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses or errors
apiService.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response.data;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default apiService;
