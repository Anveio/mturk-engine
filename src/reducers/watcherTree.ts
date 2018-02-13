import { SelectTreeNode } from '../actions/watcherTree';
import { SELECT_WATCHER_TREE_NODE } from '../constants';
import { WatcherTreeSettings } from '../types';

const initial: WatcherTreeSettings = {
  selectionKind: 'none',
  selectionId: null
};

export default (
  state = initial,
  action: SelectTreeNode
): WatcherTreeSettings => {
  switch (action.type) {
    case SELECT_WATCHER_TREE_NODE:
      return {
        ...state,
        selectionId: action.id,
        selectionKind: action.selectionKind
      };
    default:
      return state;
  }
};
