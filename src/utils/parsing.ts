import { HitAcceptFailureReason } from '../types';
import {
  errorBanner,
  hitContainerTableCell
} from '../constants/querySelectors';
import { removeCurrencyFormatting } from './formatting';

export const selectHitContainers = (el: Document): HTMLDivElement[] =>
  Array.from(el.querySelectorAll(hitContainerTableCell) as NodeListOf<
    HTMLDivElement
  >);

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

export const pageErrorPresent = (html: Document): boolean =>
  !!html.querySelector(errorBanner);

export const rateLimitErrorPresent = (html: Document): boolean => {
  const maybeRateLimitElem = html.querySelector(errorBanner);
  if (maybeRateLimitElem && maybeRateLimitElem.textContent) {
    return /exceeded/.test(maybeRateLimitElem.textContent);
  } else {
    return false;
  }
};

export const parseHitAcceptFailureReason = (
  html: Document
): HitAcceptFailureReason => {
  const maybeReasonContainer = html.querySelector('div.message.warning');
  if (maybeReasonContainer && maybeReasonContainer.textContent) {
    return maybeReasonContainer.textContent as HitAcceptFailureReason;
  } else {
    return 'Unknown';
  }
};

export const findHitIframe = (input: Document) => {
  return input.querySelector('iframe.embed-responsive-item');
};

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

  const reactProps = dataNode.getAttribute('data-react-props');

  if (!reactProps) {
    throw new Error(`No react props found on node.`);
  }

  return reactProps;
};
