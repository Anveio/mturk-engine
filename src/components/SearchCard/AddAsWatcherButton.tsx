import * as React from 'react';
import { SearchResult, RootState, WatcherMap } from '../../types';
import { Button } from '@shopify/polaris';
import { connect, Dispatch } from 'react-redux';
import { AddWatcher, addWatcher } from '../../actions/watcher';
import { watcherFromSearchResult } from '../../utils/watchers';
import { watcherAddedToast, plainToast } from '../../utils/toaster';
import { normalizedWatchers } from '../../selectors/watchers';

interface OwnProps {
  readonly hit: SearchResult;
}

interface Props {
  readonly watchers: WatcherMap;
}

interface Handlers {
  readonly onAddWatcher: (hit: SearchResult) => void;
}

class AddAsWatcherButton extends React.Component<
  Props & OwnProps & Handlers,
  never
> {
  private handleAddAsWatcher = () => {
    const { hit: { groupId }, watchers } = this.props;

    const maybeDuplicateWatcher = watchers.get(groupId);

    if (maybeDuplicateWatcher) {
      plainToast(
        `A watcher for this project already exists. Look for "${
          maybeDuplicateWatcher.title
        }" in the 'Watchers' tab.`,
        4000
      );
      return;
    }

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

const mapState = (state: RootState): Props => ({
  watchers: normalizedWatchers(state)
});

export default connect(mapState, mapDispatch)(AddAsWatcherButton);
