import { Set } from 'immutable';
import * as v4 from 'uuid/v4';

import { WatcherFolder } from '../types';

export const DEFAULT_FOLDER_NAME = 'New Folder';
export const FOLDER_NAME_SUFFIX_CONNECTOR = '-';

export const createDefaultFolderName = (suffix?: number) => {
  if (!suffix || suffix === 0) {
    return DEFAULT_FOLDER_NAME;
  } else {
    return DEFAULT_FOLDER_NAME + FOLDER_NAME_SUFFIX_CONNECTOR + suffix;
  }
};

export const findUnusedNumericSuffix = (
  folderNames: Set<string>,
  suffix = 0
): number => {
  if (!folderNames.has(createDefaultFolderName(suffix))) {
    return suffix;
  } else {
    return findUnusedNumericSuffix(folderNames, suffix + 1);
  }
};

export const generateWatcherFolder = (name: string): WatcherFolder => ({
  name,
  id: v4(),
  expanded: false
});
