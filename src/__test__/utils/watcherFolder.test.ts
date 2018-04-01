import {
  createDefaultFolderName,
  findUnusedNumericSuffix
} from '../../utils/watcherFolder';
import { extantWatcherFolderNames, emptySet } from './fixtures';

describe('Functions used in generating a new watcher folder name', () => {
  test('createDefaultFolderName properly appends a suffix', () => {
    expect(createDefaultFolderName()).toEqual('New Folder');
    expect(createDefaultFolderName(1)).toEqual('New Folder-1');
    expect(createDefaultFolderName(2)).toEqual('New Folder-2');
  });

  test('findUnusedNumericSuffix properly finds the correct numeric suffix', () => {
    expect(findUnusedNumericSuffix(emptySet)).toEqual(0);
    expect(findUnusedNumericSuffix(extantWatcherFolderNames)).toEqual(3);
  });
});
