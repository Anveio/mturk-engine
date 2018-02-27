import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Stack, Card } from '@shopify/polaris';
import { WatcherFolder, RootState, WatcherTimerMap } from '../../types';
import { getWatcherIdsAssignedToFolder } from '../../selectors/watcherFolders';

import {
  editWatcherFolder,
  WatcherFolderAction,
  deleteWatcherFolder
} from '../../actions/watcherFolders';
import { DEFAULT_WATCHER_FOLDER_ID } from '../../constants/misc';
import { scheduleWatcher, cancelNextWatcherTick } from '../../actions/watcher';
import WatcherFolderHeading from './WatcherFolderHeading';
import CreateWatcherForm from './CreateWatcherForm';
import InfoCallout from './InfoCallout';
import WatcherFolderActions from './WatcherFolderActions';

interface OwnProps {
  readonly folderId: string;
}

interface Props {
  readonly folder: WatcherFolder;
  readonly assignedWatcherIds: string[];
  readonly watcherTimers: WatcherTimerMap;
}

interface Handlers {
  readonly onEdit: (id: string, field: 'name', value: string | number) => void;
  readonly onDeleteFolder: (id: string) => void;
  readonly onScheduleWatcher: (id: string) => void;
  readonly onCancelWatcher: (id: string) => void;
}

class WatcherFolderInfo extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  private scheduleAllWatchersInFolder = () =>
    this.props.assignedWatcherIds.forEach(watcherId => {
      if (!this.props.watcherTimers.has(watcherId)) {
        this.props.onScheduleWatcher(watcherId);
      }
    });

  private cancelAllWatchersInFolder = () =>
    this.props.assignedWatcherIds.forEach(watcherId =>
      this.props.onCancelWatcher(watcherId)
    );

  private handleDeleteFolder = () =>
    this.props.onDeleteFolder(this.props.folderId);

  public render() {
    const { folder, assignedWatcherIds, onEdit } = this.props;
    return (
      <Stack vertical>
        <WatcherFolderHeading
          title={folder.name}
          editable={folder.id !== DEFAULT_WATCHER_FOLDER_ID}
          onChange={(value: string) => onEdit(folder.id, 'name', value)}
        />
        <Card
          sectioned
          title={`${assignedWatcherIds.length} watchers in this folder.`}
          actions={[
            {
              content: 'Start all',
              onAction: this.scheduleAllWatchersInFolder
            },
            { content: 'Stop all', onAction: this.cancelAllWatchersInFolder }
          ]}
        />
        <CreateWatcherForm folderId={folder.id} />
        <InfoCallout />
        <WatcherFolderActions
          folderId={folder.id}
          numWatchers={assignedWatcherIds.length}
          deletable={folder.id !== DEFAULT_WATCHER_FOLDER_ID}
          onDelete={this.handleDeleteFolder}
        />
      </Stack>
    );
  }
}

const mapState = (state: RootState, { folderId }: OwnProps): Props => ({
  folder: state.watcherFolders.get(folderId),
  assignedWatcherIds: getWatcherIdsAssignedToFolder(folderId)(state),
  watcherTimers: state.watcherTimes
});

const mapDispatch = (dispatch: Dispatch<WatcherFolderAction>): Handlers => ({
  onEdit: (id: string, field: 'name', value: string) =>
    dispatch(editWatcherFolder(id, field, value)),
  onDeleteFolder: (id: string) => dispatch(deleteWatcherFolder(id)),
  onCancelWatcher: (id: string) => dispatch(cancelNextWatcherTick(id)),
  onScheduleWatcher: (id: string) => dispatch(scheduleWatcher(id))
});

export default connect(mapState, mapDispatch)(WatcherFolderInfo);
