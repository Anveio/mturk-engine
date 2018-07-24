import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { RootState, GroupId } from '../types';
import { playNewSearchResultAudio } from '../actions/audio';
import { newResultsGroupIdsList } from '../selectors/search';

interface Props {
  readonly unreadResults: List<GroupId>;
  readonly searchAudioEnabled: boolean;
}

interface Handlers {
  readonly onNewSearchResult: () => void;
}

class NewResultAudioLayer extends React.Component<Props & Handlers, never> {
  componentDidUpdate(nextProps: Props) {
    if (!nextProps.searchAudioEnabled) {
      return;
    }

    if (!this.props.unreadResults.isSubset(nextProps.unreadResults)) {
      this.props.onNewSearchResult();
    }
  }

  public render() {
    return this.props.children;
  }
}

const mapState = (state: RootState): Props => ({
  unreadResults: newResultsGroupIdsList(state),
  searchAudioEnabled: state.searchAudioEnabled
});

const mapDispatch: Handlers = {
  onNewSearchResult: playNewSearchResultAudio
}

export default connect(mapState, mapDispatch)(NewResultAudioLayer);
