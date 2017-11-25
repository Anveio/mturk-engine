import * as localforage from 'localforage';
import { PersistedStateKeys, PersistedState } from '../types';

export const persistedStateToJsonString = async () => {
  try {
    const localForageKeys: string[] = await localforage.keys();
    const stringArray = await Promise.all(
      localForageKeys.map(
        async key => `"${key}":` + (await localforage.getItem(key))
      )
    );

    return '{' + stringArray.join(',') + '}';
  } catch (e) {
    throw new Error('Failed to read user settings.');
  }
};

export const writeToPersistedState = async (
  data: Partial<PersistedStateKeys>
) => {
  try {
    return await Promise.all(
      Object.keys(data).map(async key => localforage.setItem(key, data[key]))
    );
  } catch (e) {
    throw new Error('Failed to write to indexedDB.');
  }
};

export const generateBackupBlob = (stateString: string): Blob =>
  new Blob([stateString], {
    type: 'application/json'
  });

export const generateFileName = (): string =>
  `mturk-engine-backup-${new Date().toLocaleDateString()}.json`;

export const readUploadedFileAsText = (settingsFile: File): Promise<string> => {
  const temporaryFileReader = new FileReader();

  /**
   * FileReader.readAsText is asynchronous but does not use Promises. We wrap it
   * in a Promise here so we can await it elsewhere without blocking the main thread.
   */
  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      reject(temporaryFileReader.error);
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsText(settingsFile);
  });
};

export const createTemporaryDownloadLink = (blob: Blob): HTMLAnchorElement => {
  const userSettingsBackup = window.URL.createObjectURL(blob);
  const temporaryAnchor = document.createElement('a');
  temporaryAnchor.href = userSettingsBackup;
  temporaryAnchor.download = generateFileName();
  return temporaryAnchor;
};

/**
 * Translates a persisted state key into UI text.
 */
export const stateKeyMap = new Map<PersistedStateKeys, string>([
  ['tab', 'Currently Selected Tab'],
  ['account', 'Account Details'],
  ['hitBlocklist', 'Blocked HITs'],
  ['hitDatabase', 'HIT Database'],
  ['requesterBlocklist', 'Blocked Requesters'],
  ['sortingOption', 'Search Sort Settings'],
  ['searchOptions', 'Search Settings'],
  ['topticonSettings', 'Turkopticon Settings'],
  ['watchers', 'Watchers'],
  ['audioSettingsV1', 'Audio Settings'],
  ['dailyEarningsGoal', 'Daily Earnings Goal']
]);

export type CheckedStateKeyMap = Map<PersistedStateKeys, boolean>;

export const generateCheckStateKeysMap = (
  payload: Partial<PersistedState>
): CheckedStateKeyMap =>
  Object.keys(payload).reduce(
    (acc: CheckedStateKeyMap, cur: PersistedStateKeys) => acc.set(cur, true),
    new Map<PersistedStateKeys, boolean>()
  );
