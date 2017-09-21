import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { List } from 'immutable';
import { RootState } from '../types';
import { PlayAudio, playAudio } from '../actions/audio';
import { newResultsGroupIdsList } from '../selectors/searchTable';

export interface Props {
  readonly audio1: HTMLAudioElement;
  readonly unreadResults: List<string>;
}

export interface Handlers {
  readonly onNewSearchResult: (file: HTMLAudioElement) => void;
}

class AudioLayer extends React.PureComponent<Props & Handlers, never> {
  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.unreadResults.isSubset(this.props.unreadResults)) {
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
  unreadResults: newResultsGroupIdsList(state),
  audio1: state.audioSettingsV1.audio2
});

const mapDispatch = (dispatch: Dispatch<PlayAudio>): Handlers => ({
  onNewSearchResult: (file: HTMLAudioElement) => {
    dispatch(playAudio(file));
  }
});

export default connect(mapState, mapDispatch)(AudioLayer);
