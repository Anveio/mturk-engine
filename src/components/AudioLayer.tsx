import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { newResults } from '../selectors/searchTable';

export interface Props {
  readonly unreadSearchResultSrc: string;
  readonly watcherAcceptSrc: string;
  readonly numUnreadSearchResults: number;
}

export interface Handlers {
  readonly onNewSearchResult: () => void;
}

class AudioLayer extends React.PureComponent<Props & Handlers, never> {
  componentWillReceiveProps(props: Props) {
    if (props.numUnreadSearchResults > this.props.numUnreadSearchResults) {
      this.props.onNewSearchResult();
    }
  }

  public render() {
    return (
      <div id="audio-layer">
        <audio id="new-search-result-audio">
          <source src={this.props.unreadSearchResultSrc} type="audio/ogg" />
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
  watcherAcceptSrc: state.audioSettings.watcherAccept,
  numUnreadSearchResults: newResults(state).size
});

const mapDispatch = (dispatch: Dispatch<any>): Handlers => ({
  onNewSearchResult: () => console.log('new hit found')
});

export default connect(mapState, mapDispatch)(AudioLayer);
