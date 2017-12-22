import { ChangeVolume, ToggleAudioEnabled } from '../actions/audio';
import { AudioSettings } from '../types';
import { CHANGE_VOLUME, TOGGLE_AUDIO_ENABLED } from '../constants';

const initial: AudioSettings = {
  enabled: false,
  volume: 0.1
};

type AudioAction = ChangeVolume | ToggleAudioEnabled;

export default (state = initial, action: AudioAction): AudioSettings => {
  switch (action.type) {
    case CHANGE_VOLUME:
      return {
        ...state,
        volume: action.value
      };
    case TOGGLE_AUDIO_ENABLED:
      return {
        ...state,
        enabled: !state.enabled
      };
    default:
      return state;
  }
};
