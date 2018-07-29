import * as React from 'react';
import {
  RootState,
  HumanIntelligenceTask,
  GroupId,
  Watcher
} from '../../types';
import { Button } from '@shopify/polaris';
import { connect } from 'react-redux';
import { addWatcher, scheduleWatcher } from '../../actions/watcher';
import { createWatcherWithInfo } from '../../utils/watchers';
import { watcherAddedToast, showPlainToast } from '../../utils/toaster';
import { watcherIdsSet, watcherTitlesMap } from '../../selectors/watchers';
import { Set, Map } from 'immutable';

interface OwnProps {
  readonly hit: HumanIntelligenceTask;
}

interface Props {
  readonly watcherIds: Set<string>;
  readonly watcherTitles: Map<GroupId, string>;
}

interface Handlers {
  readonly onAddWatcher: (watcher: Watcher) => void;
  readonly onScheduleWatcher: (id: string, origin: number) => void;
}

class AddAsWatcherButton extends React.Component<
  Props & OwnProps & Handlers,
  never
> {
  private handleAddAsWatcher = () => {
    const {
      hit,
      watcherIds,
      watcherTitles,
      onAddWatcher,
      onScheduleWatcher
    } = this.props;

    const maybeDuplicateWatcher = watcherIds.has(hit.groupId);

    if (maybeDuplicateWatcher) {
      showPlainToast(
        `A watcher for this project already exists. Look for "${watcherTitles.get(
          hit.groupId
        )}" in the 'Watchers' tab.`,
        4000
      );
      return;
    }

    onAddWatcher(createWatcherWithInfo(hit, new Date()));
    watcherAddedToast(hit, () => {
      onScheduleWatcher(hit.groupId, Date.now());
    });
  };

  public render() {
    return (
      <Button size="slim" onClick={this.handleAddAsWatcher}>
        Add as Watcher
      </Button>
    );
  }
}

const mapDispatch: Handlers = {
  onAddWatcher: addWatcher,
  onScheduleWatcher: scheduleWatcher
};

const mapState = (state: RootState): Props => ({
  watcherIds: watcherIdsSet(state),
  watcherTitles: watcherTitlesMap(state)
});

export default connect(
  mapState,
  mapDispatch
)(AddAsWatcherButton);
