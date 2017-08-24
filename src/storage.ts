import * as localForage from 'localforage';
import { fromJS } from 'immutable';
import { RootState } from './types';

/**
 * Asynchronously loads some slice of RootState from localForage storage.
 */
export const loadState = async (): Promise<Partial<RootState>> => {
  try {
    const serializedState = await localForage.getItem<RootState>('state');
    if (serializedState === null) {
      return Promise.reject(undefined);
    } else {
      return fromJS(serializedState);
    }
  } catch (err) {
    console.warn(
      `Problem restoring Mturk Engine settings. This may be due to privacy settings in your browser.`
    );
    return Promise.reject(undefined);
  }
};

/**
 * Asynchronously saves some slice of RootState into localForage storage under
 * the key 'state'.
 * @param state
 */
export const saveState = async (state: Partial<RootState>): Promise<void> => {
  try {
    await localForage.setItem('state', state);
  } catch (e) {
    console.warn('Problem saving state.');
    return Promise.reject(undefined);
  }
};
