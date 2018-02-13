import * as React from 'react';
import { connect } from 'react-redux';
import { DisplayText, Card, Stack } from '@shopify/polaris';
import { Watcher, WatcherFolder, RootState } from '../../types';
import { watchersToFolderWatcherMap } from '../../selectors/watcherFolders';

interface OwnProps {
  readonly folderId: string;
}

interface Props {
  readonly folder: WatcherFolder;
  readonly assignedWatchers: Watcher[];
}

class WatcherFolderInfo extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { folder, assignedWatchers } = this.props;
    return (
      <Stack vertical>
        <DisplayText>{folder.name}</DisplayText>
        <Card>
          {assignedWatchers.map(watcher => (
            <Card.Section>{watcher.title}</Card.Section>
          ))}
        </Card>
      </Stack>
    );
  }
}

const mapState = (state: RootState, { folderId }: OwnProps): Props => ({
  folder: state.watcherFolders.get(folderId),
  assignedWatchers: watchersToFolderWatcherMap(state).get(folderId)
});

export default connect(mapState)(WatcherFolderInfo);
