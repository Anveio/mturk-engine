import * as localforage from 'localforage';

export const persistedStateToStringArray = async () => {
  try {
    const localForageKeys: string[] = await localforage.keys();
    return await Promise.all(
      localForageKeys.map(
        async key => `"${key}":` + (await localforage.getItem(key))
      )
    );
  } catch (e) {
    throw new Error('Failed to read user settings.');
  }
};

export const generateBackupBlob = (stateStringArray: string[]): Blob =>
  new Blob([stateStringArray.join('')], {
    type: 'text/plain'
  });

export const generateFileName = (): string =>
  `mturk-engine-backup-${new Date().toLocaleDateString()}.bak`;

export const uploadDataFromFile = (settingsFile: File) => {
  BackupFileInput.readAsText(settingsFile);
};

export const createTemporaryDownloadLink = (blob: Blob): HTMLAnchorElement => {
  const userSettingsBackup = window.URL.createObjectURL(blob);
  const temporaryAnchor = document.createElement('a');
  temporaryAnchor.href = userSettingsBackup;
  temporaryAnchor.download = generateFileName();
  return temporaryAnchor;
};

export const BackupFileInput = new FileReader();
