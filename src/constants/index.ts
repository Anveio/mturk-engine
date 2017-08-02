import { configureApiRoot } from '../utils/config';

export const API_URL = configureApiRoot();

/**
 * The string to be passed to querySelector in order to find the table containing all fetched HITs.
 * Credit to: L697 https://greasyfork.org/en/scripts/21815-hit-finder-beta/code#n697
 */
export const hitIdentifier = `table[cellpadding="0"][cellspacing="0"][border="0"][width="100%"][height="100%"]`;

/**
 * The string to be passed to querySelector in order to find the anchor HTML Element containing the requesterID.
 * Credit to: L704 https://greasyfork.org/en/scripts/21815-hit-finder-beta/code#n704
 */
export const requesterIdAnchorString = `a[href^="/mturk/searchbar?selectedSearchType=hitgroups&requesterId="]`;

export const hitDescriptionString = `td[class="capsule_field_title"]:contains(Description:)`;
