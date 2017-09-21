import { select } from 'redux-saga/effects';
import { PlayAudio } from '../actions/audio';
import { RootState } from '../types';

export function* playAudio(action: PlayAudio) {
  try {
    const audioEnabled: boolean = yield select(
      (state: RootState) => state.audioSettingsV1.enabled
    );
    if (audioEnabled) {
      yield action.file.play();
    }
  } catch (e) {
    console.log('Playing audio failed.');
  }
}
