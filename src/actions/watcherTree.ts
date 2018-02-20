import {
  SELECT_WATCHER_TREE_NODE,
  WATCHER_FOLDER_TOGGLE_EXPAND
} from '../constants/index';
import { SelectionKind } from '../types';

export interface SelectTreeNode {
  readonly type: SELECT_WATCHER_TREE_NODE;
  readonly id: string;
  readonly selectionKind: SelectionKind;
}

export interface ToggleWatcherFolderExpand {
  readonly type: WATCHER_FOLDER_TOGGLE_EXPAND;
  readonly folderId: string;
}

export type WatcherTreeAction = SelectTreeNode | ToggleWatcherFolderExpand;

export const selectWatcherFile = (
  id: string,
  selectionKind: SelectionKind
): SelectTreeNode => ({
  type: SELECT_WATCHER_TREE_NODE,
  id,
  selectionKind
});

export const toggleWatcherFolderExpand = (
  folderId: string
): ToggleWatcherFolderExpand => ({
  type: WATCHER_FOLDER_TOGGLE_EXPAND,
  folderId
});
