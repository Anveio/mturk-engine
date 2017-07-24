/**
 * Parses an HTML string into a DocumentFragment using widely supported Range.
 * @param htmlString 
 */
const stringToDomFragment = (htmlString: string): DocumentFragment => {
  const range = document.createRange();
  range.selectNode(document.body); // required in Safari
  return range.createContextualFragment(htmlString);
};

/**
 * Accepts a DocumentFragment and returns all elements that are a HIT container.
 * @param dom A DocumentFragment created by stringToDomFragment
 */
const filterHits = (dom: DocumentFragment) => {
  return dom.querySelector('tbody#HTT');
};

/**
 * Production config. Clears the head and body of a document so that the react app can cleanly be inserted.
 */
const clearDom = (): void => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
};

/**
 * Production config. Appends a div with the id of root to the body of the present document.
 */
const createRootDiv = (): void => {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
};

/**
 * Production config. Appends a link to Shopify Polaris's stylesheet to the head of the present document.
 */
const importPolarisStylesheet = (): void => {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'https://sdks.shopifycdn.com/polaris/1.0.2/polaris.css';
  document.head.appendChild(stylesheet);
};

export {
  stringToDomFragment,
  filterHits,
  clearDom,
  createRootDiv,
  importPolarisStylesheet
};
