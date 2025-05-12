import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_API;

export const api = axios.create({
  baseURL: API_URL,
});