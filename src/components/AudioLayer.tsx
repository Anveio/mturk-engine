import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { List } from 'immutable';
import { RootState } from '../types';
import { PlayAudio, playAudio } from '../actions/audio';
import { newResultsGroupIdsList } from '../selectors/searchTable';

export interface Props {
  readonly audioNewSearch: HTMLAudioElement;
  readonly unreadResults: List<string>;
}

export interface Handlers {
  readonly onNewSearchResult: (file: HTMLAudioElement) => void;
}

class AudioLayer extends React.PureComponent<Props & Handlers, never> {
  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.unreadResults.isSubset(this.props.unreadResults)) {
      this.props.onNewSearchResult(this.props.audioNewSearch);
    }
  }

  public render() {
    return <div id="audio-layer" />;
  }
}

const mapState = (state: RootState): Props => ({
  unreadResults: newResultsGroupIdsList(state),
  audioNewSearch: state.audioFiles.audioNewSearch
});

const mapDispatch = (dispatch: Dispatch<PlayAudio>): Handlers => ({
  onNewSearchResult: (file: HTMLAudioElement) => {
    dispatch(playAudio(file));
  }
});

export default connect(mapState, mapDispatch)(AudioLayer);
