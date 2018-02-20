import {
  WATCHER_FOLDER_TOGGLE_EXPAND,
  WATCHER_FOLDER_EDIT,
  CREATE_WATCHER_FOLDER
} from '../constants/index';
import { WatcherFolder } from '../types';

export interface ToggleWatcherFolderExpand {
  readonly type: WATCHER_FOLDER_TOGGLE_EXPAND;
  readonly folderId: string;
}

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

export type WatcherFolderAction =
  | CreateWatcherFolder
  | ToggleWatcherFolderExpand
  | EditWatcherFolder;

export const toggleWatcherFolderExpand = (
  folderId: string
): ToggleWatcherFolderExpand => ({
  type: WATCHER_FOLDER_TOGGLE_EXPAND,
  folderId
});

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
