import { Stack } from '@shopify/polaris';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  deleteWatcherFolder,
  editWatcherFolder
} from '../../actions/watcherFolders';
import { DEFAULT_WATCHER_FOLDER_ID } from '../../constants/misc';
import { getWatcherIdsAssignedToFolder } from '../../selectors/watcherFolders';
import { RootState, WatcherFolder } from '../../types';
import CreateWatcherForm from './CreateWatcherForm';
import InfoCallout from './InfoCallout';
import WatcherFolderActions from './WatcherFolderActions';
import WatcherFolderHeading from './WatcherFolderHeading';
import WatcherFolderInfo from './WatcherFolderInfo';

interface OwnProps {
  readonly folderId: string;
}

interface Props {
  readonly folder: WatcherFolder;
  readonly assignedWatcherIds: string[];
}

interface Handlers {
  readonly onEdit: (id: string, field: 'name', value: string | number) => void;
  readonly onDeleteFolder: (id: string) => void;
}

class WatcherFolderView extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  private handleDeleteFolder = () =>
    this.props.onDeleteFolder(this.props.folderId);

  public render() {
    const { folder, assignedWatcherIds, onEdit } = this.props;
    return (
      <Stack vertical>
        <WatcherFolderHeading
          key={folder.id}
          title={folder.name}
          editable={folder.id !== DEFAULT_WATCHER_FOLDER_ID}
          onChange={(value: string) => onEdit(folder.id, 'name', value)}
        />
        <WatcherFolderInfo folder={folder} />
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
  assignedWatcherIds: getWatcherIdsAssignedToFolder(folderId)(state)
});

const mapDispatch: Handlers = {
  onEdit: editWatcherFolder,
  onDeleteFolder: deleteWatcherFolder
};

export default connect(
  mapState,
  mapDispatch
)(WatcherFolderView);
