export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.mturk.com'
    : 'http://localhost:7777';
