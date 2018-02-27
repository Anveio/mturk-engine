import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, WatcherTimerMap } from '../../types';
import { Card } from '@shopify/polaris';
import { cancelNextWatcherTick, scheduleWatcher } from '../../actions/watcher';
import { getWatcherIdsAssignedToFolder } from '../../selectors/watcherFolders';
import { WatcherFolderAction } from '../../actions/watcherFolders';

interface OwnProps {
  readonly folderId: string;
}

interface Props {
  readonly assignedWatcherIds: string[];
  readonly watcherTimers: WatcherTimerMap;
}

interface Handlers {
  readonly onScheduleWatcher: (id: string) => void;
  readonly onCancelWatcher: (id: string) => void;
}

class WatcherFolderInfo extends React.PureComponent<Props & Handlers, never> {
  private startInactiveWatchers = () =>
    this.props.assignedWatcherIds.forEach(watcherId => {
      if (!this.props.watcherTimers.has(watcherId)) {
        this.props.onScheduleWatcher(watcherId);
      }
    });

  private cancelAllWatchers = () =>
    this.props.assignedWatcherIds.forEach(watcherId =>
      this.props.onCancelWatcher(watcherId)
    );

  public render() {
    const { assignedWatcherIds } = this.props;
    return (
      <Card
        sectioned
        title={`${assignedWatcherIds.length} watchers in this folder.`}
        actions={[
          {
            content: 'Start all',
            onAction: this.startInactiveWatchers
          },
          { content: 'Stop all', onAction: this.cancelAllWatchers }
        ]}
      />
    );
  }
}

const mapState = (state: RootState, { folderId }: OwnProps): Props => ({
  assignedWatcherIds: getWatcherIdsAssignedToFolder(folderId)(state),
  watcherTimers: state.watcherTimes
});

const mapDispatch = (dispatch: Dispatch<WatcherFolderAction>): Handlers => ({
  onCancelWatcher: (id: string) => dispatch(cancelNextWatcherTick(id)),
  onScheduleWatcher: (id: string) => dispatch(scheduleWatcher(id))
});

export default connect(mapState, mapDispatch)(WatcherFolderInfo);
