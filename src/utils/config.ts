/**
 * Uses the window.location.hostname to determine the base url of the environment the script is running in.
 */
export const configureApiRoot = () => {
  const hostname = window && window.location && window.location.hostname;
  switch (hostname) {
    case 'www.mturk.com':
      return 'https://www.mturk.com';
    case 'worker.mturk.com':
      return 'https://worker.mturk.com';
    case 'localhost':
      return 'http://localhost:7777';
    default:
      throw new Error('Invalid hostname');
  }
};

/**
 * Production config. Clears the head and body of a document so that the react app can cleanly be inserted.
 */
export const clearDom = (): void => {
  document.documentElement.innerHTML = '';
};

/**
 * Production config. Appends a div with the id of root to the body of the present document.
 */
export const createRootDiv = (): void => {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
};
