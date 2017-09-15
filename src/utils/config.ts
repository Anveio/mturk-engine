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

export const importBlueprintStyleSheet = (): void => {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.href = 'https://unpkg.com/@blueprintjs/core@^1.11.0/dist/blueprint.css';
  document.head.appendChild(stylesheet);
};

export const importNormalizrStyleSheet = (): void => {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.href = 'https://unpkg.com/normalize.css@^4.1.1';
  document.head.appendChild(stylesheet);
};

export const attachToastrStylesSheet = (): void => {
  const toastrStyles = document.createElement('style');
  toastrStyles.innerHTML = toastrStylesheet;
  document.head.appendChild(toastrStyles);
};

export const attachPolarisStyleSheet = (): void => {
  const stylesheet = document.createElement('style');
  stylesheet.innerHTML = polarisStylesheet;
  document.head.appendChild(stylesheet);
};
