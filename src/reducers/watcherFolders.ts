import { SelectWatcherFolder } from '../actions/watcherTree';
import { SELECT_WATCHER_FOLDER } from '../constants';
import { WatcherFolder, Watcher } from '../types';
import { Map } from 'immutable';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';

const initial = Map<string, WatcherFolder>({
  [DEFAULT_WATCHER_FOLDER_ID]: {
    expanded: true,
    id: DEFAULT_WATCHER_FOLDER_ID,
    name: 'Unsorted Watchers',
    watchers: Map<string, Watcher>()
  }
});

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
