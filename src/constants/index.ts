import { configureApiRoot } from '../utils/config';

export const API_URL = configureApiRoot();

export const hitIdentifier = `table[cellpadding="0"][cellspacing="0"][border="0"][width="100%"][height="100%"]`;

export const requesterIdAnchorString = `a[href^="/mturk/searchbar?selectedSearchType=hitgroups&requesterId="]`;
