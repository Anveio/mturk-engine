import * as localforage from 'localforage';
import {
  PersistedStateKey,
  PersistedState,
  ImmutablePersistedStateKey
} from '../types';
import * as transit from 'transit-immutable-js';
import { Set } from 'immutable';

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

export const writeToPersistedState = async (data: Partial<PersistedState>) => {
  try {
    await Promise.all(
      Object.keys(data).map(
        async key => await localforage.setItem(key, JSON.stringify(data[key]))
      )
    );
  } catch (e) {
    throw new Error('Failed to write to indexedDB.');
  }
};

export const generateBackupBlob = (stateObject: string): Blob =>
  new Blob([stateObject], {
    type: 'application/json'
  });

export const generateFileName = (): string =>
  `mturk-engine-backup-${new Date().toLocaleDateString()}.json`;

export const readUploadedFileAsText = (
  settingsFile: File
): Promise<string | DOMException> => {
  const temporaryFileReader = new FileReader();

  /**
   * FileReader.readAsText is asynchronous but does not use Promises. We wrap it
   * in a Promise here so we can await it elsewhere without blocking the main thread.
   */
  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException('Problem parsing input file.'));
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

export const downloadTemporaryAnchor = (anchor: HTMLAnchorElement) => {
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

/**
 * Translates a persisted state key into UI text.
 */
export const stateKeyMap = new Map<PersistedStateKey, string>([
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
  ['dailyEarningsGoal', 'Daily Earnings Goal'],
  ['notificationSettings', 'Notification Settings'],
  ['watcherFolders', 'Watcher Folders'],
  ['searchAudioEnabled', 'Search Audio Enabled']
]);

/**
 * Provides O(1) lookup to determine if a key is for an immutable object.
 */
export const immutableStateKeySet = Set<ImmutablePersistedStateKey>([
  'hitBlocklist',
  'hitDatabase',
  'requesterBlocklist',
  'watchers'
]);

type CheckedStateKeyMap = Map<PersistedStateKey, boolean>;

export const generateCheckStateKeysMap = (status: boolean) => (
  payload: Partial<PersistedState>
): CheckedStateKeyMap =>
  (Object.keys(payload) as PersistedStateKey[]).reduce(
    (acc: CheckedStateKeyMap, cur: PersistedStateKey) => acc.set(cur, status),
    new Map<PersistedStateKey, boolean>()
  );

export const parseUploadedBackupFile = (data: string) => {
  const parsedData = transit.fromJSON(data);
  return Object.keys(parsedData).reduce(
    (acc: Partial<PersistedState>, key: string) => ({
      ...acc,
      [key]: parsedData[key]
    }),
    {}
  );
};

export const parseImmutableJson = (data: string) => transit.fromJSON(data);

export const keepOnlyCheckedStateKeys = (whiteList: PersistedStateKey[]) => (
  uploadedState: Partial<PersistedState> | null
): Partial<PersistedState> => {
  return uploadedState
    ? whiteList.reduce(
        (acc: Partial<PersistedState>, key: PersistedStateKey) => ({
          ...acc,
          [`reduxPersist:${key}`]: uploadedState[`reduxPersist:${key}`]
        }),
        {}
      )
    : {};
};
