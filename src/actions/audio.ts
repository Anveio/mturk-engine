import { EDIT_AUDIO_SOURCE } from '../constants';
import { AudioSettings } from '../types';

export interface EditAudioSource {
  type: EDIT_AUDIO_SOURCE;
  field: keyof AudioSettings;
  value: string;
}

export const editAudioSrc = (
  field: keyof AudioSettings,
  value: string
): EditAudioSource => ({
  type: EDIT_AUDIO_SOURCE,
  field,
  value
});
