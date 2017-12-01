import { connect, Dispatch } from 'react-redux';
import { TextContainer } from '@shopify/polaris';
import { AddWatcher, addWatcher } from '../../actions/watcher';
import * as React from 'react';
import { Watcher, SearchResult } from '../../types';

export interface OwnProps {
  readonly hit: SearchResult;
}

export interface Handlers {
  readonly onAddWatcher: (watcher: Watcher) => void;
}

class AddWatcherToast extends React.Component<OwnProps & Handlers, never> {
  public render() {
    return <TextContainer>Sample Text</TextContainer>;
  }
}

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (watcher: Watcher) => dispatch(addWatcher(watcher))
});

export default connect(null, mapDispatch)(AddWatcherToast);
