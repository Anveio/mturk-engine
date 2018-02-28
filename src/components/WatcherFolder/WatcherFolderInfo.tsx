import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, WatcherTimerMap, WatcherFolder } from '../../types';
import { Card } from '@shopify/polaris';
import { cancelNextWatcherTick, scheduleWatcher } from '../../actions/watcher';
import { getWatcherIdsAssignedToFolder } from '../../selectors/watcherFolders';
import { WatcherFolderAction } from '../../actions/watcherFolders';
import { DEFAULT_WATCHER_FOLDER_ID } from '../../constants/misc';

interface OwnProps {
  readonly folder: WatcherFolder;
}

interface Props {
  readonly assignedWatcherIds: string[];
  readonly watcherTimers: WatcherTimerMap;
}

interface Handlers {
  readonly onScheduleWatcher: (id: string) => void;
  readonly onCancelWatcher: (id: string) => void;
}

class WatcherFolderInfo extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
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

  private createdOnInfoMarkup = () =>
    this.props.folder.id === DEFAULT_WATCHER_FOLDER_ID
      ? 'This is the default folder and cannot be deleted or edited.'
      : `Created on ${new Date(
          this.props.folder.dateNumCreation
        ).toLocaleString()}`;

  public render() {
    const { assignedWatcherIds } = this.props;
    return (
      <Card
        title={`${assignedWatcherIds.length} watchers in this folder.`}
        actions={[
          {
            content: 'Start all',
            onAction: this.startInactiveWatchers
          },
          { content: 'Stop all', onAction: this.cancelAllWatchers }
        ]}
      >
        <Card.Section>{this.createdOnInfoMarkup()}</Card.Section>
      </Card>
    );
  }
}

const mapState = (state: RootState, { folder }: OwnProps): Props => ({
  assignedWatcherIds: getWatcherIdsAssignedToFolder(folder.id)(state),
  watcherTimers: state.watcherTimes
});

const mapDispatch = (dispatch: Dispatch<WatcherFolderAction>): Handlers => ({
  onCancelWatcher: (id: string) => dispatch(cancelNextWatcherTick(id)),
  onScheduleWatcher: (id: string) => dispatch(scheduleWatcher(id))
});

export default connect(mapState, mapDispatch)(WatcherFolderInfo);
