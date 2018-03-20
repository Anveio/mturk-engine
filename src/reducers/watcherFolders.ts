import { WatcherFolderAction } from '../actions/watcherFolders';
import {
  WATCHER_FOLDER_EDIT,
  CREATE_WATCHER_FOLDER,
  DELETE_WATCHER_FOLDER
} from '../constants';
import { WatcherFolder, WatcherFolderMap } from '../types';
import { Map } from 'immutable';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';

const defaultWatcherFolder: WatcherFolder = {
  id: DEFAULT_WATCHER_FOLDER_ID,
  name: 'Unsorted Watchers',
  dateNumCreation: 0
};

const initial: WatcherFolderMap = Map<string, WatcherFolder>({
  [DEFAULT_WATCHER_FOLDER_ID]: defaultWatcherFolder
});

export default (
  state = initial,
  action: WatcherFolderAction
): WatcherFolderMap => {
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
