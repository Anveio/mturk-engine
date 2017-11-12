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
    type: 'application/json'
  });

export const downloadDataAsFile = async () => {
  try {
    const data = await persistedStateToStringArray();
    console.log(data.join(''));
  } catch (e) {}
};

export const generateFileName = (): string =>
  `mturk-engine-backup-${new Date().toLocaleDateString()}.bak`;

// static uploadDataFromFile = (stringifedUserSettings: string[]) => {
//   const x = stringifedUserSettings.reduce((acc, cur: string) => {
//     const [key, value] = cur.split(/"reduxPersist:(.*?)"/).slice(1);
//     return { ...acc, [key]: value };
//   }, {});
//   console.log(x);
// };

export const createTemporaryDownloadLink = (blob: Blob): HTMLAnchorElement => {
  const url = window.URL.createObjectURL(blob);
  const temporaryAnchor = document.createElement('a');
  temporaryAnchor.href = url;
  temporaryAnchor.download = generateFileName();
  return temporaryAnchor;
};
