import { AccountInfo } from '../types';
import {
  workerFullNameQuerySelector,
  availableEarningsQuerySelector,
  lifetimeBonusEarningsQuerySelector,
  lifetimeHitEarningsQuerySelector,
  numPendingQuerySelector,
  lifetimeRejectedQuerySelector,
  lifetimeTotalEarningsQuerySelector,
  lifetimeApprovedQuerySelector,
  workerAmazonIdReactPropsQuerySelector
} from '../constants/querySelectors';
import {
  parseStringProperty,
  parseCurrencyProperty,
  parseNumericProperty,
  parseReactProps
} from './parsing';

const parseDashboardPage = (input: Document) => ({
  id: parseAmazonId(input),
  fullName: parseStringProperty(workerFullNameQuerySelector, 'name')(input),
  availableEarnings: parseCurrencyProperty(availableEarningsQuerySelector)(
    input
  ),
  lifetimeBonusEarnings: parseCurrencyProperty(
    lifetimeBonusEarningsQuerySelector
  )(input),
  lifetimeHitEarnings: parseCurrencyProperty(lifetimeHitEarningsQuerySelector)(
    input
  ),
  lifetimeApproved: parseNumericProperty(lifetimeApprovedQuerySelector)(input),
  lifetimeTotalEarnings: parseCurrencyProperty(
    lifetimeTotalEarningsQuerySelector
  )(input),
  lifetimeRejected: parseNumericProperty(lifetimeRejectedQuerySelector)(input),
  numPending: parseNumericProperty(numPendingQuerySelector)(input)
});

interface CopyTextData {
  readonly textToCopy: string;
}

const parseAmazonId = (input: Document): string => {
  /**
   * For whatever reason, just getting the node's text content wasn't working. 
   * Maybe simplify later?
   */
  try {
    const workerIdData: CopyTextData = JSON.parse(
      parseReactProps(input)(workerAmazonIdReactPropsQuerySelector)
    );

    return workerIdData.textToCopy;
  } catch (e) {
    console.warn(e);
    return '[Error:accountId]';
  }
};

export const generateAccountInfo = (dashboard: Document): AccountInfo => {
  const parseableAccountInfo = parseDashboardPage(dashboard);
  const {
    lifetimeRejected,
    lifetimeApproved,
    numPending
  } = parseableAccountInfo;

  return {
    ...parseableAccountInfo,
    lifetimeSubmitted: lifetimeRejected + lifetimeApproved + numPending
  };
};
