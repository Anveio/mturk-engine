import { removeCurrencyFormatting } from './formatting';

export const parseStringProperty = (queryString: string, fallback: string) => (
  input: Document | Element
) => {
  const maybeElem = input.querySelector(queryString);
  return maybeElem && maybeElem.textContent
    ? maybeElem.textContent.trim()
    : `[Error:${fallback}]`;
};

export const parseNumericProperty = (queryString: string, fallback = 0) => (
  input: Document | Element
): number => {
  const maybeElem = input.querySelector(queryString);
  return maybeElem && maybeElem.textContent
    ? parseFloat(maybeElem.textContent.trim().replace(/,/g, ''))
    : fallback;
};

export const parseCurrencyProperty = (queryString: string) => (
  input: Document | Element
): number => {
  const maybeElem = input.querySelector(queryString);
  return maybeElem && maybeElem.textContent
    ? parseFloat(removeCurrencyFormatting(maybeElem.textContent))
    : 0;
};

export const findHitIframe = (input: Document) => {
  return input.querySelector('iframe.embed-responsive-item');
};

export const findCaptchaContainer = (input: Document) =>
  input.querySelector('img.captcha-image');

/**
 * If found, the returned `div` will have a data-react-props attribute.
 * @param input
 */
export const findErrorDiv = (input: Document) =>
  input.querySelector('#MainContent > div:nth-child(2) > div > div');

export const validateHitAccept = (html: Document): boolean => {
  return !!findHitIframe(html);
};

export const parseReactProps = (html: Document) => (
  querySelector: string
): string => {
  const dataNode = html.querySelector(querySelector);

  if (!dataNode) {
    throw new Error(
      `Node containing React props was not found. querySelector: ${querySelector}`
    );
  }

  return getDataReactProps(dataNode);
};

const getDataReactProps = (dataNode: Element): string => {
  const reactProps = dataNode.getAttribute('data-react-props');

  if (!reactProps) {
    throw new Error(`No react props found on node.`);
  } else {
    return reactProps;
  }
};

export const executeRegex = (inputString: string) => (regex: RegExp) => {
  const resultArr = regex.exec(inputString);
  if (resultArr === null || resultArr.length < 1) {
    throw new Error(
      `Problem parsing string. Input: ${inputString} :: Regexp: ${regex} :: Result: ${resultArr}`
    );
  } else {
    return resultArr[1];
  }
};

export const testRegex = (inputString: string) => (regex: RegExp) =>
  regex.test(inputString);
