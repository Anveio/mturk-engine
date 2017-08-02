/**
 * Uses the window.location.hostname to determine the base url of the environment the script is running in.
 */
const configureApiRoot = () => {
  const hostname = window && window.location && window.location.hostname;
  switch (hostname) {
    case 'mturk.com':
      return 'https://www.mturk.com';
    case 'localhost':
      return 'http://localhost:7777';
    default:
      throw new Error('Invalid hostname');
  }
};

// const stringToDomFragment = (htmlString: string): DocumentFragment => {
//   const range = document.createRange();
//   range.selectNode(document.body); // required in Safari
//   return range.createContextualFragment(htmlString);
// };

/**
 * Parses an HTML string into a table element.
 * @param htmlString 
 */
const stringToDomElement = (htmlString: string): Element => {
  const el = document.createElement('table');
  el.innerHTML = htmlString;
  return el;
};

/**
 * Accepts a DocumentFragment and returns all divs that are a HIT container.
 * @param dom A DocumentFragment created by stringToDomFragment
 */
// const selectHitDivs = (dom: DocumentFragment) => {
//   return dom.querySelector('div.HE');
// };

const hitIdentifierString =
  'table[cellpadding="0"][cellspacing="0"][border="0"][width="100%"][height="100%"]';

const selectHitContainers = (el: Element) => {
  return el.querySelectorAll(hitIdentifierString);
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

const tabulateData = (input: Element): HitTableEntry[] => {
  const rows = input.querySelectorAll('tr');
  return Array.from(rows).map(el => {
    return {
      requester: 'req',
      reward: 1,
      title: 'title'
    };
  });
};

export {
  configureApiRoot,
  stringToDomElement,
  selectHitContainers,
  clearDom,
  createRootDiv,
  importPolarisStylesheet,
  tabulateData
};
