import * as localforage from 'localforage';

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

export const generateBackupBlob = (stateString: string): Blob =>
  new Blob([stateString], {
    type: 'text/plain'
  });

export const generateFileName = (): string =>
  `mturk-engine-backup-${new Date().toLocaleDateString()}.bak`;

export const uploadDataFromFile = async (settingsFile: File) => {
  const BackupFileReader = new FileReader();
  BackupFileReader.onerror = err => {
    BackupFileReader.abort();
  };

  return new Promise((resolve, reject) => {
    BackupFileReader.onload = () => {
      resolve(BackupFileReader.result);
    };
    BackupFileReader.readAsText(settingsFile);
  });
};

export const createTemporaryDownloadLink = (blob: Blob): HTMLAnchorElement => {
  const userSettingsBackup = window.URL.createObjectURL(blob);
  const temporaryAnchor = document.createElement('a');
  temporaryAnchor.href = userSettingsBackup;
  temporaryAnchor.download = generateFileName();
  return temporaryAnchor;
};
