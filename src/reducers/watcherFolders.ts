import { SelectWatcherFolder } from '../actions/watcherTree';
import { SELECT_WATCHER_FOLDER } from '../constants';
import { WatcherFolder } from '../types';
import { Map } from 'immutable';

const initial = Map<string, WatcherFolder>();

export default (
  state = initial,
  action: SelectWatcherFolder
): Map<string, WatcherFolder> => {
  switch (action.type) {
    case SELECT_WATCHER_FOLDER:
      return state.update(action.folderId, folder => ({
        ...folder,
        expanded: !folder.expanded
      }));
    default:
      return state;
  }
};
