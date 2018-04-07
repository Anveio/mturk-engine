import {
  EDIT_AUDIO_SOURCE,
  PLAY_AUDIO,
  CHANGE_VOLUME,
  TOGGLE_AUDIO_ENABLED
} from '../constants';
import { AudioSettings } from '../types';
import { AudioSources } from 'constants/enums';

export interface PlayAudio {
  readonly type: PLAY_AUDIO;
  readonly fileSrc: string;
}

export interface EditAudioSource {
  readonly type: EDIT_AUDIO_SOURCE;
  readonly field: keyof AudioSettings;
  readonly value: string;
}

export interface ToggleAudioEnabled {
  readonly type: TOGGLE_AUDIO_ENABLED;
}

export interface ChangeVolume {
  readonly type: CHANGE_VOLUME;
  readonly value: number;
}

export const editAudioSrc = (
  field: keyof AudioSettings,
  value: string
): EditAudioSource => ({
  type: EDIT_AUDIO_SOURCE,
  field,
  value
});

export const playNewSearchResultAudio = (): PlayAudio => ({
  type: PLAY_AUDIO,
  fileSrc: AudioSources.NEW_SEARCH_RESULT
});

export const playWatcherSuccessAudio = (): PlayAudio => ({
  type: PLAY_AUDIO,
  fileSrc: AudioSources.SUCCESSFUL_WATCHER_ACCEPT
});

export const changeVolume = (value: number): ChangeVolume => ({
  type: CHANGE_VOLUME,
  value
});

export const toggleAudioEnabled = (): ToggleAudioEnabled => ({
  type: TOGGLE_AUDIO_ENABLED
});
