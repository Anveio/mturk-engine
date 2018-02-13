import { SELECT_WATCHER_TREE_NODE } from '../constants/index';
import { SelectionKind } from '../types';

export interface SelectTreeNode {
  readonly type: SELECT_WATCHER_TREE_NODE;
  readonly id: string;
  readonly selectionKind: SelectionKind;
}

export const selectWatcherFile = (
  id: string,
  selectionKind: SelectionKind
): SelectTreeNode => ({
  type: SELECT_WATCHER_TREE_NODE,
  id,
  selectionKind
});
