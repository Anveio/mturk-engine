import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { List } from 'immutable';
import { RootState } from '../types';
import { PlayAudio, playAudioFile } from '../actions/audio';
import { newResultsGroupIdsList } from '../selectors/search';
import { AudioSources } from 'constants/enums';

interface Props {
  readonly unreadResults: List<string>;
}

interface Handlers {
  readonly onNewSearchResult: (audioSrc: string) => void;
}

class NewResultAudioLayer extends React.Component<Props & Handlers, never> {
  public static audioFile = AudioSources.NEW_SEARCH_RESULT;

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
  onNewSearchResult: (audioSrc: string) => {
    dispatch(playAudioFile(audioSrc));
  }
});

export default connect(mapState, mapDispatch)(NewResultAudioLayer);
