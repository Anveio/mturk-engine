import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { List } from 'immutable';
import { RootState } from '../../types';
import { PlayAudio, playAudio } from '../../actions/audio';
import { newResultsGroupIdsList } from '../../selectors/search';

interface Props {
  readonly unreadResults: List<string>;
}

interface Handlers {
  readonly onNewSearchResult: (file: HTMLAudioElement) => void;
}

class NewResultAudioLayer extends React.Component<Props & Handlers, never> {
  public static audioFile = new Audio(
    'https://k003.kiwi6.com/hotlink/w9aqj8az8t/ping.wav'
  );

  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.unreadResults.isSubset(this.props.unreadResults)) {
      this.props.onNewSearchResult(NewResultAudioLayer.audioFile);
    }
  }

  public render() {
    return this.props.children;
  }
}

const mapState = (state: RootState): Props => ({
  unreadResults: newResultsGroupIdsList(state)
});

const mapDispatch = (dispatch: Dispatch<PlayAudio>): Handlers => ({
  onNewSearchResult: (file: HTMLAudioElement) => {
    dispatch(playAudio(file));
  }
});

export default connect(mapState, mapDispatch)(NewResultAudioLayer);
