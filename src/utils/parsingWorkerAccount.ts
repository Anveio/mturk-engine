import { AccountInfo } from '../types';
import {
  workerAmazonIdQuerySelector,
  workerFullNameQuerySelector,
  availableEarningsQuerySelector,
  lifetimeBonusEarningsQuerySelector,
  lifetimeHitEarningsQuerySelector,
  numPendingQuerySelector,
  lifetimeRejectedQuerySelector,
  lifetimeTotalEarningsQuerySelector,
  lifetimeApprovedQuerySelector
} from '../constants/querySelectors';
import {
  parseStringProperty,
  parseCurrencyProperty,
  parseNumericProperty
} from './parsing';

const parseDashboardPage = (input: Document) => ({
  id: parseStringProperty(workerAmazonIdQuerySelector, 'accountId')(input),
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
