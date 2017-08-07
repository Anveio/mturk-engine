import { TOpticonAction } from '../actions/turkopticon';
import { FETCH_TURKOPTICON_SUCCESS } from '../constants';

const initial: Map<string, RequesterDetails> = new Map();

export default (
  state = initial,
  action: TOpticonAction
): Map<string, RequesterDetails> => {
  let partialState: Map<string, RequesterDetails>;

  switch (action.type) {
    case FETCH_TURKOPTICON_SUCCESS:
      partialState = action.data;
      break;
    default:
      return state;
  }
  const x = { ...partialState, ...state };
  return new Map(x);
};
