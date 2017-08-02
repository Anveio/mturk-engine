// const stringToDomFragment = (htmlString: string): DocumentFragment => {
//   const range = document.createRange();
//   range.selectNode(document.body); // required in Safari
//   return range.createContextualFragment(htmlString);
// };

/**
 * Parses an HTML string into a table element.
 * @param htmlString 
 */
export const stringToDomElement = (htmlString: string): HTMLTableElement => {
  const el = document.createElement('table');
  el.innerHTML = htmlString;
  return el;
};

const hitIdentifier =
  'table[cellpadding="0"][cellspacing="0"][border="0"][width="100%"][height="100%"]';

/**
 * Accepts a DocumentFragment and returns all divs that are a HIT container.
 * @param dom A DocumentFragment created by stringToDomFragment
 */
export const selectHitContainers = (el: HTMLTableElement): HTMLTableElement[] =>
  Array.from(el.querySelectorAll(hitIdentifier) as NodeListOf<HTMLTableElement>);

export const tabulateData = (input: HTMLTableElement[]): HitTableEntry[] =>
  input.map(el => ({
    requester: parseRequesterName(el),
    reward: 1,
    title: 'title'
  }));

export const parseRequesterName = (input: HTMLTableElement): string => {
  const reqNameElement = input.querySelector('span.requesterIdentity');
  console.log(reqNameElement);
  if (reqNameElement && reqNameElement.textContent) {
    return reqNameElement.textContent;
  } else {
    return '[Error retrieving requester name]';
  }
};

export const parseHitPage = (html: string): HitTableEntry[] => {
  const table = stringToDomElement(html);
  const hitContainers = selectHitContainers(table);
  const hitData = tabulateData(hitContainers);
  return hitData;
};
