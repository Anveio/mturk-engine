import {
  WATCHER_FOLDER_EDIT,
  CREATE_WATCHER_FOLDER,
  DELETE_WATCHER_FOLDER
} from '../constants/index';
import { WatcherFolder } from '../types';

export interface EditWatcherFolder {
  readonly type: WATCHER_FOLDER_EDIT;
  readonly folderId: string;
  readonly field: 'name';
  readonly value: string;
}

export interface CreateWatcherFolder {
  readonly type: CREATE_WATCHER_FOLDER;
  readonly payload: WatcherFolder;
}

export interface DeleteWatcherFolder {
  readonly type: DELETE_WATCHER_FOLDER;
  readonly folderId: string;
}

export type WatcherFolderAction =
  | CreateWatcherFolder
  | DeleteWatcherFolder
  | EditWatcherFolder;

export const editWatcherFolder = (
  folderId: string,
  field: 'name',
  value: string
): WatcherFolderAction => ({
  type: WATCHER_FOLDER_EDIT,
  folderId,
  field,
  value
});

export const createWatcherFolder = (
  payload: WatcherFolder
): CreateWatcherFolder => ({
  type: CREATE_WATCHER_FOLDER,
  payload
});

export const deleteWatcherFolder = (folderId: string): DeleteWatcherFolder => ({
  type: DELETE_WATCHER_FOLDER,
  folderId
});
