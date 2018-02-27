import { AudioFiles } from '../types';

const initial: AudioFiles = {
  audioNewSearch: new Audio(
    'https://k003.kiwi6.com/hotlink/w9aqj8az8t/ping.wav'
  )
};

export default (state = initial, action: {}) => {
  return state;
};
