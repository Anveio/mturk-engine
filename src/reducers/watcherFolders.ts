import { WatcherFolderAction } from '../actions/watcherFolders';
import {
  WATCHER_FOLDER_EDIT,
  CREATE_WATCHER_FOLDER,
  DELETE_WATCHER_FOLDER
} from '../constants';
import { WatcherFolder, Watcher } from '../types';
import { Map } from 'immutable';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';

const initial = Map<string, WatcherFolder>({
  [DEFAULT_WATCHER_FOLDER_ID]: {
    id: DEFAULT_WATCHER_FOLDER_ID,
    name: 'Unsorted Watchers',
    watchers: Map<string, Watcher>(),
    dateNumCreation: 0
  } as WatcherFolder
});

export default (
  state = initial,
  action: WatcherFolderAction
): Map<string, WatcherFolder> => {
  switch (action.type) {
    case CREATE_WATCHER_FOLDER:
      return state.set(action.payload.id, action.payload);
    case DELETE_WATCHER_FOLDER:
      return state.delete(action.folderId);
    case WATCHER_FOLDER_EDIT:
      return state.update(action.folderId, folder => ({
        ...folder,
        [action.field]: action.value
      }));
    default:
      return state;
  }
};
