import {
  EDIT_AUDIO_SOURCE,
  PLAY_AUDIO,
  CHANGE_VOLUME,
  TOGGLE_AUDIO_ENABLED
} from '../constants';
import { AudioSettings } from '../types';

export interface PlayAudio {
  type: PLAY_AUDIO;
  file: HTMLAudioElement;
}

export interface EditAudioSource {
  type: EDIT_AUDIO_SOURCE;
  field: keyof AudioSettings;
  value: string;
}

export interface ToggleAudioEnabled {
  type: TOGGLE_AUDIO_ENABLED;
}

export interface ChangeVolume {
  type: CHANGE_VOLUME;
  value: number;
}

export const editAudioSrc = (
  field: keyof AudioSettings,
  value: string
): EditAudioSource => ({
  type: EDIT_AUDIO_SOURCE,
  field,
  value
});

export const playAudio = (file: HTMLAudioElement): PlayAudio => ({
  type: PLAY_AUDIO,
  file
});

export const changeVolume = (value: number): ChangeVolume => ({
  type: CHANGE_VOLUME,
  value
});

export const toggleAudioEnabled = (): ToggleAudioEnabled => ({
  type: TOGGLE_AUDIO_ENABLED
});
