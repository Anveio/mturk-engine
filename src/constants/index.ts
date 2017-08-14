import { configureApiRoot } from '../utils/config';

export const FETCH_HIT_PAGE_REQUEST = 'FETCH_HIT_PAGE_REQUEST';
export type FETCH_HIT_PAGE_REQUEST = typeof FETCH_HIT_PAGE_REQUEST;

export const FETCH_HIT_PAGE_SUCCESS = 'FETCH_HIT_PAGE_SUCCESS';
export type FETCH_HIT_PAGE_SUCCESS = typeof FETCH_HIT_PAGE_SUCCESS;

export const FETCH_HIT_PAGE_FAILURE = 'FETCH_HIT_PAGE_FAILURE';
export type FETCH_HIT_PAGE_FAILURE = typeof FETCH_HIT_PAGE_FAILURE;

export const FETCH_TURKOPTICON_SUCCESS = 'FETCH_TURKOPTICON_SUCCESS';
export type FETCH_TURKOPTICON_SUCCESS = typeof FETCH_TURKOPTICON_SUCCESS;

export const FETCH_TURKOPTICON_REQUEST = 'FETCH_TURKOPTICON_REQUEST';
export type FETCH_TURKOPTICON_REQUEST = typeof FETCH_TURKOPTICON_REQUEST;

export const FETCH_TURKOPTICON_FAILURE = 'FETCH_TURKOPTICON_FAILURE';
export type FETCH_TURKOPTICON_FAILURE = typeof FETCH_TURKOPTICON_FAILURE;

export const UPDATE_FIELD = 'UPDATE_FIELD';
export type UPDATE_FIELD = typeof UPDATE_FIELD;
export const TOGGLE_FORM = 'TOGGLE_FORM';
export type TOGGLE_FORM = typeof TOGGLE_FORM;

export const API_URL = configureApiRoot();
/**
 * The string to be passed to querySelector in order to find the table containing all fetched HITs.
 * Credit to: L697 https://greasyfork.org/en/scripts/21815-hit-finder-beta/code#n697
 */
export const hitTableIdentifier = `table[cellpadding="0"][cellspacing="0"][border="0"][width="100%"][height="100%"]`;

/**
 * The string to be passed to querySelector in order to find the anchor HTML Element containing the requesterID.
 * Credit to: L704 https://greasyfork.org/en/scripts/21815-hit-finder-beta/code#n704
 */
export const requesterIdAnchor = `a[href^="/mturk/searchbar?selectedSearchType=hitgroups&requesterId="]`;

export const groupIdAnchor = `a[href^="/mturk/preview?groupId="]`;

/**
 * The root URL for querying the attributes of multiple requesters simultaneously
 */
export const turkopticonApiMulti = `https://turkopticon.ucsd.edu/api/multi-attrs.php?ids=`;

export const tutkopticonBaseUrl = `https://turkopticon.ucsd.edu/`;
