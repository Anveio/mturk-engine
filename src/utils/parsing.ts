import { AcceptHitFailureReason } from '../types';
import { errorBanner } from '../constants/querySelectors';
import { removeCurrencyFormatting } from './formatting';
import { ErrorBannerProps } from '../worker-mturk-api';

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
    ? parseFloat(maybeElem.textContent.trim())
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

export const rateLimitErrorPresent = (html: Document): boolean => {
  const maybeRateLimitElem = html.querySelector(errorBanner);
  if (maybeRateLimitElem && maybeRateLimitElem.textContent) {
    return /exceeded/.test(maybeRateLimitElem.textContent);
  } else {
    return false;
  }
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

export const getDataReactProps = (dataNode: Element): string => {
  const reactProps = dataNode.getAttribute('data-react-props');

  if (!reactProps) {
    throw new Error(`No react props found on node.`);
  } else {
    return reactProps;
  }
};

export const parseAcceptFailureReason = (
  input: Document
): AcceptHitFailureReason => {
  /**
   * TODO: This does not actually work yet. The banner doesn't seem to render when failing to accept a HIT via XHR.
   */
  if (findCaptchaContainer(input)) {
    return 'CAPTCHA';
  }

  const errorDiv = findErrorDiv(input);
  if (!errorDiv) {
    return 'UNKNOWN';
  }

  const errorInfo: ErrorBannerProps = JSON.parse(getDataReactProps(errorDiv));
  if (errorInfo.header === 'There are no more of these HITs available') {
    return 'NO_AVAILABILITY';
  } else {
    return 'UNKNOWN';
  }
};

export const failureReasonToWords = (input: AcceptHitFailureReason): string => {
  switch (input) {
    case 'CAPTCHA':
      return `You must successfully complete a CAPTCHA before accepting any more HITs.`;
    case 'EXCEEDED_RATE_LIMIT':
      return `You've made too many requests to Mturk recently. Wait a few moments and then try again.`;
    case 'NO_AVAILABILITY':
      return `There are no more HITs available in this group.`;
    case 'UNQUALIFIED':
      return `You're not qualified to accept that HIT.`;
    default:
      return '';
  }
};
