import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Stack, Card } from '@shopify/polaris';
import { WatcherFolder, RootState } from '../../types';
import { getWatcherIdsAssignedToFolder } from '../../selectors/watcherFolders';
import WatcherFolderListItem from './WatcherFolderListItem';
import WatcherFolderHeading from './WatcherFolderHeading';
import {
  EditWatcherFolder,
  editWatcherFolder
} from '../../actions/watcherFolders';
import { DEFAULT_WATCHER_FOLDER_ID } from '../../constants/misc';
import { scheduleWatcher, cancelNextWatcherTick } from '../../actions/watcher';

interface OwnProps {
  readonly folderId: string;
}

interface Props {
  readonly folder: WatcherFolder;
  readonly assignedWatcherIds: string[];
}

interface Handlers {
  readonly onEdit: (id: string, field: 'name', value: string | number) => void;
  readonly onScheduleWatcher: (id: string) => void;
  readonly onCancelWatcher: (id: string) => void;
}

class WatcherFolderInfo extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  private scheduleAllWatchersInFolder = () =>
    this.props.assignedWatcherIds.forEach(watcherId =>
      this.props.onScheduleWatcher(watcherId)
    );

  private cancelAllWatchersInFolder = () =>
    this.props.assignedWatcherIds.forEach(watcherId =>
      this.props.onCancelWatcher(watcherId)
    );

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
              content: 'Restart all',
              onAction: this.scheduleAllWatchersInFolder
            },
            { content: 'Stop all', onAction: this.cancelAllWatchersInFolder }
          ]}
        />
        {assignedWatcherIds.map(watcherId => (
          <WatcherFolderListItem key={watcherId} watcherId={watcherId} />
        ))}
      </Stack>
    );
  }
}

const mapState = (state: RootState, { folderId }: OwnProps): Props => ({
  folder: state.watcherFolders.get(folderId),
  assignedWatcherIds: getWatcherIdsAssignedToFolder(folderId)(state)
});

const mapDispatch = (dispatch: Dispatch<EditWatcherFolder>): Handlers => ({
  onEdit: (id: string, field: 'name', value: string) =>
    dispatch(editWatcherFolder(id, field, value)),
  onCancelWatcher: (id: string) => dispatch(cancelNextWatcherTick(id)),
  onScheduleWatcher: (id: string) => dispatch(scheduleWatcher(id))
});

export default connect(mapState, mapDispatch)(WatcherFolderInfo);
