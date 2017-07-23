const stringToDomFragment = (htmlString: string): DocumentFragment => {
  const range = document.createRange();
  range.selectNode(document.body); // required in Safari
  return range.createContextualFragment(htmlString);
};

const filterHits = (dom: DocumentFragment) => {
  return dom.querySelectorAll('*');
};

export { stringToDomFragment, filterHits };
