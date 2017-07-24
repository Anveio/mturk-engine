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
  return dom.querySelectorAll('*');
};

/**
 * Clears the head and body of a document so that the react app can cleanly be inserted.
 * Only for production use.
 */
const clearDom = (): void => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
};

const createRootDiv = (): void => {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
};

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
