import toastrStylesheet from './toastrStylesheet';
import polarisStylesheet from './polarisStylesheet';

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

/**
 * Production config. Appends a link to Shopify Polaris's stylesheet to the head of the present document.
 */
export const importPolarisStylesheet = (): void => {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.href = 'https://sdks.shopifycdn.com/polaris/1.3.1/polaris.min.css';
  document.head.appendChild(stylesheet);
};

export const importToastrStylesheet = (): void => {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.href =
    'https://diegoddox.github.io/react-redux-toastr/7.1/react-redux-toastr.min.css';
  document.head.appendChild(stylesheet);
};

export const attachToastrStyles = (): void => {
  const toastrStyles = document.createElement('style');
  toastrStyles.innerHTML = toastrStylesheet;
  document.head.appendChild(toastrStyles);
};

export const attachPolarisStyleSheet = (): void => {
  const stylesheet = document.createElement('style');
  stylesheet.innerHTML = polarisStylesheet;
  document.head.appendChild(stylesheet);
};
