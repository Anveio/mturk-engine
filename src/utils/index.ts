const stringToDomFragment = (htmlString: string): DocumentFragment => {
  const range = document.createRange();
  range.selectNode(document.body); // required in Safari
  return range.createContextualFragment(htmlString);
};

export { stringToDomFragment };
