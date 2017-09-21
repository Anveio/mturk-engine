import {
  EditAudioSource,
  ChangeVolume,
  ToggleAudioEnabled
} from '../actions/audio';
import { AudioSettings } from '../types';
import {
  EDIT_AUDIO_SOURCE,
  CHANGE_VOLUME,
  TOGGLE_AUDIO_ENABLED
} from '../constants';

const initial: AudioSettings = {
  enabled: true,
  volume: 0.1,
};

type AudioAction = EditAudioSource | ChangeVolume | ToggleAudioEnabled;

export default (state = initial, action: AudioAction) => {
  let partialState: Partial<AudioSettings> | undefined;

  switch (action.type) {
    case EDIT_AUDIO_SOURCE:
      partialState = {
        [action.field]: action.value
      };
      break;
    case CHANGE_VOLUME:
      partialState = {
        volume: action.value
      };
      break;
    case TOGGLE_AUDIO_ENABLED:
      partialState = {
        enabled: !state.enabled
      };
      break;
    default:
      return state;
  }

  return { ...state, ...partialState };
};
