import * as React from 'react';
import { SearchResult } from '../../types';
import { Button } from '@shopify/polaris';
import { connect, Dispatch } from 'react-redux';
import { AddWatcher, addWatcher } from '../../actions/watcher';
import { watcherFromSearchResult } from '../../utils/watchers';
import { watcherAddedToast } from '../../utils/toaster';

interface OwnProps {
  readonly hit: SearchResult;
}

interface Handlers {
  readonly onAddWatcher: (hit: SearchResult) => void;
}

class AddAsWatcherButton extends React.Component<OwnProps & Handlers, never> {
  private handleAddAsWatcher = () => {
    this.props.onAddWatcher(this.props.hit);
  };

  public render() {
    return (
      <Button size="slim" onClick={this.handleAddAsWatcher}>
        Add as Watcher
      </Button>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (hit: SearchResult) => {
    dispatch(addWatcher(watcherFromSearchResult(hit)));
    watcherAddedToast(hit);
  }
});

export default connect(null, mapDispatch)(AddAsWatcherButton);
