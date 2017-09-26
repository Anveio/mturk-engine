export const hitTableBody = `body > div:nth-child(9) > table:nth-child(3) > tbody`;

export const hitContainerTableCell = `table[cellpadding="0"][cellspacing="0"][border="0"][width="100%"][height="100%"]`;

/**
 * The string to be passed to querySelector in order to find the anchor HTML Element containing the requesterID.
 * Credit to: L704 https://greasyfork.org/en/scripts/21815-hit-finder-beta/code#n704
 */
export const requesterIdAnchor = `a[href^="/mturk/searchbar?selectedSearchType=hitgroups&requesterId="]`;

export const groupIdAnchor = `a[href^="/mturk/preview?groupId="]`;

export const hitIdAnchor = `a[href^="/mturk/continue?hitId="]`;

export const timeLeftSelector = `tbody > tr > td:nth-child(3) > table > tbody > tr > td.capsule_field_text`;

export const qualsRequiredSelector =
  '.capsuletarget > table:nth-child(2) > tbody > tr > td > table > tbody > tr';

export const timeAllotedSelector =
  'tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td.capsule_field_text';

export const descriptionSelector =
  '.capsuletarget > table:nth-child(1) > tbody > tr:nth-child(1) > td.capsule_field_text';

export const workerIdSelector =
  'body > table:nth-child(8) > tbody > tr > td > span.orange_text_right';
