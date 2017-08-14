/**
 * Production config. Clears the head and body of a document so that the react app can cleanly be inserted.
 */
export const clearDom = (): void => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
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
  stylesheet.href = 'https://sdks.shopifycdn.com/polaris/1.3.1/polaris.min.css';
  document.head.appendChild(stylesheet);
};
