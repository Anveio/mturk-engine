import { call, select } from 'redux-saga/effects';
import { PlayAudio } from '../actions/audio';
import { RootState } from '../types';

const playAudioFile = async (file: HTMLAudioElement, volume: number) => {
  try {
    file.volume = volume;
    return await file.play();
  } catch (e) {
    console.warn(e);
  }
};

export function* playAudio(action: PlayAudio) {
  const audioEnabled: boolean = yield select(
    (state: RootState) => state.audioSettingsV1.enabled
  );

  try {
    if (audioEnabled) {
      const volume: number = yield select(
        (state: RootState) => state.audioSettingsV1.volume
      );
      yield (action.file.volume = volume);
      yield call(playAudioFile, action.file, volume);
    }
  } catch (e) {
    console.warn('Playing audio failed.');
  }
}
