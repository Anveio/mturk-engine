import * as React from 'react';
import { connect } from 'react-redux';
import { DisplayText, Stack, Card } from '@shopify/polaris';
import { WatcherFolder, RootState } from '../../types';
import { getWatcherIdsAssignedToFolder } from '../../selectors/watcherFolders';
import WatcherFolderListItem from './WatcherFolderListItem';

interface OwnProps {
  readonly folderId: string;
}

interface Props {
  readonly folder: WatcherFolder;
  readonly assignedWatcherIds: string[];
}

// interface Handlers {
//   onScheduleMultipleWatchers: (ids: string[]) => void;
// }

class WatcherFolderInfo extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { folder, assignedWatcherIds } = this.props;
    return (
      <Stack vertical>
        <DisplayText>{folder.name}</DisplayText>
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

export default connect(mapState)(WatcherFolderInfo);
