import { call, select } from 'redux-saga/effects';
import { PlayAudio } from '../actions/audio';
import { RootState } from '../types';
import { AudioSources } from 'constants/enums';

const audioFiles = {
  [AudioSources.NEW_SEARCH_RESULT]: new Audio(AudioSources.NEW_SEARCH_RESULT),
  [AudioSources.SUCCESSFUL_WATCHER_ACCEPT]: new Audio(
    AudioSources.SUCCESSFUL_WATCHER_ACCEPT
  )
};

export function* playAudioSaga(action: PlayAudio) {
  const audioEnabled: boolean = yield select(
    (state: RootState) => state.audioSettingsV1.enabled
  );

  try {
    if (audioEnabled) {
      const volume: number = yield select(
        (state: RootState) => state.audioSettingsV1.volume
      );
      yield call(playAudioFile, action.fileSrc, volume);
    }
  } catch (e) {
    console.warn('Playing audio failed.');
  }
}

const playAudioFile = async (audioSrc: string, volume: number) => {
  const audioElement: HTMLAudioElement | undefined = audioFiles[audioSrc];

  if (!audioElement) {
    return;
  }

  /**
   * Squaring the volume evens out perceived loudness.
   */
  audioElement.volume = volume * volume;

  return await audioElement.play();
};
