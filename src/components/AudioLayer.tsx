import * as React from 'react';

import { connect } from 'react-redux';
import { RootState } from '../types';

export interface Props {
  readonly unreadSearchResultSrc: string;
  readonly watcherAcceptSrc: string;
}

class AudioLayer extends React.PureComponent<Props, never> {
  public render() {
    return (
      <div id="audio-layer">
        <audio id="new-search-result-audio">
          <source src={this.props.unreadSearchResultSrc} type="audio/ogg"/>
        </audio>
        <audio id="watcher-accept-audio">
          <source src={this.props.watcherAcceptSrc} type="audio/ogg" />
        </audio>
      </div>
    );
  }
}

const mapState = (state: RootState): Props => ({
  unreadSearchResultSrc: state.audioSettings.unreadSearchResult,
  watcherAcceptSrc: state.audioSettings.watcherAccept
});

export default connect(mapState)(AudioLayer);
