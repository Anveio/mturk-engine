import * as React from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@blueprintjs/core';
import { Card, List } from '@shopify/polaris';
import { pluralize } from '../../utils/formatting';
import { RootState, WatcherFolder, Watcher } from '../../types';
import { getWatchersAssignedToFolder } from '../../selectors/watcherFolders';

interface OwnProps {
  readonly folderId: string;
  readonly modalOpen: boolean;
}

interface Props {
  readonly folder: WatcherFolder;
  readonly assignedWatchers: Watcher[];
}

interface Handlers {
  readonly onClose: () => void;
  readonly onSubmit: () => void;
}

class ConfirmDeleteWatcherFolder extends React.Component<
  Props & OwnProps & Handlers,
  never
> {
  public render() {
    const {
      modalOpen,
      onClose,
      onSubmit,
      folder,
      assignedWatchers
    } = this.props;
    const numWatchers = assignedWatchers.length;
    const primaryAction = {
      content: 'Delete Folder',
      destructive: true,
      onAction: onSubmit
    };

    const secondaryAction = {
      content: 'Cancel',
      onAction: onClose
    };

    return (
      <Dialog
        isOpen={modalOpen}
        iconName="delete"
        title={`Confirm folder deletion. `}
        onClose={onClose}
      >
        <Card
          sectioned
          title={`Deleting folder "${
            folder.name
          }" with ${numWatchers} ${pluralize('watcher', 'watchers')(
            numWatchers
          )}.`}
          primaryFooterAction={primaryAction}
          secondaryFooterAction={secondaryAction}
        >
          <List>
            {assignedWatchers.map(watcher => (
              <List.Item key={watcher.groupId}>{watcher.title}</List.Item>
            ))}
          </List>
        </Card>
      </Dialog>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  folder: state.watcherFolders.get(ownProps.folderId),
  assignedWatchers: getWatchersAssignedToFolder(ownProps.folderId)(state)
});

export default connect(mapState)(ConfirmDeleteWatcherFolder);
