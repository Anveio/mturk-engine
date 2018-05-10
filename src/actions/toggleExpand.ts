import {
  TOGGLE_SEARCH_RESULT_EXPAND,
  COLLAPSE_ALL_SEARCH_RESULTS,
  TOGGLE_QUEUE_ITEM_EXPAND,
  COLLAPSE_ALL_QUEUE_ITEMS
} from '../constants';
import { GroupId } from '../types';

export interface ToggleSearchResultExpand {
  readonly type: TOGGLE_SEARCH_RESULT_EXPAND;
  readonly groupId: GroupId;
}

export interface CollapseAllResults {
  readonly type: COLLAPSE_ALL_SEARCH_RESULTS;
}

export interface ToggleQueueItemExpand {
  readonly type: TOGGLE_QUEUE_ITEM_EXPAND;
  readonly hitId: string;
}

export interface CollapseAllQueueItems {
  readonly type: COLLAPSE_ALL_QUEUE_ITEMS;
}

export type SearchExpandAction = ToggleSearchResultExpand | CollapseAllResults;
export type QueueExpandAction = ToggleQueueItemExpand | CollapseAllQueueItems;

export const toggleSearchResultExpand = (
  groupId: GroupId
): ToggleSearchResultExpand => ({
  type: TOGGLE_SEARCH_RESULT_EXPAND,
  groupId
});

export const collapseAllSearchResults = (): CollapseAllResults => ({
  type: COLLAPSE_ALL_SEARCH_RESULTS
});

export const toggleQueueItemExpand = (
  hitId: string
): ToggleQueueItemExpand => ({
  type: TOGGLE_QUEUE_ITEM_EXPAND,
  hitId
});

export const CollapseAllQueueItems = (): CollapseAllQueueItems => ({
  type: COLLAPSE_ALL_QUEUE_ITEMS
});
