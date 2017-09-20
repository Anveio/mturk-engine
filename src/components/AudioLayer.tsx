import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { PlayAudio, playAudio } from '../actions/audio';
import { newResults } from '../selectors/searchTable';

export interface Props {
  readonly audio1: HTMLAudioElement;
  readonly numUnreadSearchResults: number;
}

export interface Handlers {
  readonly onNewSearchResult: (file: HTMLAudioElement) => void;
}

class AudioLayer extends React.PureComponent<Props & Handlers, never> {
  componentWillReceiveProps(props: Props) {
    if (props.numUnreadSearchResults > this.props.numUnreadSearchResults) {
      this.props.onNewSearchResult(this.props.audio1);
    }
  }
  public render() {
    return (
      <div id="audio-layer">
        {/* <audio id="new-search-result-audio">
          <source src={this.props.unreadSearchResultSrc} type="audio/ogg" />
        </audio>
        <audio id="watcher-accept-audio">
          <source src={this.props.watcherAcceptSrc} type="audio/ogg" />
        </audio> */}
      </div>
    );
  }
}

const mapState = (state: RootState): Props => ({
  numUnreadSearchResults: newResults(state).size,
  audio1: state.audioSettingsV1.audio1
});

const mapDispatch = (dispatch: Dispatch<PlayAudio>): Handlers => ({
  onNewSearchResult: (file: HTMLAudioElement) => {
    dispatch(playAudio(file));
  }
});

export default connect(mapState, mapDispatch)(AudioLayer);
