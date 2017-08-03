/**
 * Uses the window.location.hostname to determine the base url of the environment the script is running in.
 */
export const configureApiRoot = () => {
  const hostname = window && window.location && window.location.hostname;
  switch (hostname) {
    case 'www.mturk.com':
      return 'https://www.mturk.com';
    case 'localhost':
      return 'http://localhost:7777';
    default:
      throw new Error('Invalid hostname');
  }
};
