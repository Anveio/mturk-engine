import { AudioFiles } from '../types';

const initial: AudioFiles = {
  audioNewSearch: new Audio(
    'https://k003.kiwi6.com/hotlink/85iq6xu5ul/coins.ogg'
  )
};

export default (state = initial, action: {}) => {
  return state;
};
