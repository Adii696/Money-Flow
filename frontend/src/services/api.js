import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE_URL
});

// Attach token helper
export const setAuthToken = (token) => {
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common['Authorization'];
  }
};

export const logout = () => {
  setAuthToken(null);
};

export const getTransactions = async (filters) => {
  const params = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== 'all') {
      params[key] = value;
    }
  });

  const response = await client.get('/transactions', { params });
  return response.data;
};

export const createTransaction = async (transaction) => {
  const response = await client.post('/transactions', transaction);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await client.delete(`/transactions/${id}`);
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await client.post('/auth/login', { email, password });
  const { token } = response.data;
  setAuthToken(token);
  return response.data;
};

export const register = async ({ name, email, password }) => {
  const response = await client.post('/auth/register', { name, email, password });
  const { token } = response.data;
  setAuthToken(token);
  return response.data;
};
