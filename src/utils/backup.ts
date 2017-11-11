import * as localforage from 'localforage';

export const stringifyPersistedState = async () => {
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

export const downloadDataAsFile = async () => {
  try {
    const data = await stringifyPersistedState();
    console.log(data.join(''));
  } catch (e) {}
};

// static uploadDataFromFile = (stringifedUserSettings: string[]) => {
//   const x = stringifedUserSettings.reduce((acc, cur: string) => {
//     const [key, value] = cur.split(/"reduxPersist:(.*?)"/).slice(1);
//     return { ...acc, [key]: value };
//   }, {});
//   console.log(x);
// };
