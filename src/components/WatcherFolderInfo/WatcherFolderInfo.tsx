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

interface OwnProps {
  readonly folderId: string;
}

interface Props {
  readonly folder: WatcherFolder;
  readonly assignedWatcherIds: string[];
}

interface Handlers {
  readonly onEdit: (id: string, field: 'name', value: string | number) => void;
}

class WatcherFolderInfo extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  public render() {
    const { folder, assignedWatcherIds, onEdit } = this.props;
    return (
      <Stack vertical>
        <WatcherFolderHeading
          title={folder.name}
          onChange={(value: string) => onEdit(folder.id, 'name', value)}
        />
        <Card
          sectioned
          title={`${assignedWatcherIds.length} watchers in this folder.`}
          actions={[{ content: 'Start all' }]}
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
    dispatch(editWatcherFolder(id, field, value))
});

export default connect(mapState, mapDispatch)(WatcherFolderInfo);
