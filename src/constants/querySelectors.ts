export const hitTableBody = `body > div:nth-child(9) > table:nth-child(3) > tbody`;

export const hitContainerTableCell = `table[cellpadding="0"][cellspacing="0"][border="0"][width="100%"][height="100%"]`;

/**
 * The string to be passed to querySelector in order to find the anchor HTML Element containing the requesterID.
 * Credit to: L704 https://greasyfork.org/en/scripts/21815-hit-finder-beta/code#n704
 */
export const requesterIdAnchor = `a[href^="/mturk/searchbar?selectedSearchType=hitgroups&requesterId="]`;

export const groupIdAnchor = `a[href^="/mturk/preview?groupId="]`;

export const hitIdAnchor = `a[href^="/mturk/continue?hitId="]`;

export const userNameSpan = `span#user_name_field`;

export const timeLeftSelector = `tbody > tr > td:nth-child(3) > table > tbody > tr > td.capsule_field_text`;

export const qualsRequiredSelector =
  '.capsuletarget > table:nth-child(2) > tbody > tr > td > table > tbody > tr';

export const timeAllotedSelector =
  'tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td.capsule_field_text';

export const descriptionSelector =
  '.capsuletarget > table:nth-child(1) > tbody > tr:nth-child(1) > td.capsule_field_text';

export const workerIdSelector =
  'body > table:nth-child(8) > tbody > tr > td > span.orange_text_right';

export const errorBanner = 'td.error_title';

export const statusDate = '.statusDateColumnValue';
export const statusSubmitted = '.statusSubmittedColumnValue';
export const statusApproved = '.statusApprovedColumnValue';
export const statusRejected = '.statusRejectedColumnValue';
export const statusPending = '.statusPendingColumnValue';
export const statusEarnings = '.statusEarningsColumnValue';
export const statusDetailHitLink = 'td.statusdetailRequesterColumnValue > a';

export const statusDetailMorePages = 'img[src="/media/right_dbl_arrow.gif"]';

export const lifetimeHitEarnings =
  'td#approved_hits_earnings_amount > span.reward';
export const lifetimeBonusEarnings = 'td#bonus_earnings_amount > span.reward';
export const lifetimeTotalEarnings = 'td#total_earnings_amount > span.reward';

export const availableEarnings = 'td#transfer_earnings > span.reward';

// tslint:disable-next-line:max-line-length
export const lifetimeSubmitted =
  'body > table:nth-child(12) > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)';

// tslint:disable-next-line:max-line-length
export const lifetimeApproved =
  'body > table:nth-child(12) > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(2)';

// tslint:disable-next-line:max-line-length
export const lifetimeRejected =
  'body > table:nth-child(12) > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2)';

// tslint:disable-next-line:max-line-length
export const numPending =
  'body > table:nth-child(12) > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(2)';
