import * as React from 'react';
import { PageActions } from '@shopify/polaris';
import ConfirmDeleteWatcherFolder from './ConfirmDeleteWatcherFolder';

interface Props {
  readonly folderId: string;
  readonly numWatchers: number;
  readonly deletable: boolean;
  readonly onDelete: () => void;
}

interface State {
  readonly modalOpen: boolean;
}

class WatcherFolderActions extends React.Component<Props, State> {
  public readonly state: State = { modalOpen: false };

  private toggleModalOpen = () => {
    this.setState((prevState: State) => ({
      modalOpen: !prevState.modalOpen
    }));
  };

  public render() {
    const { numWatchers, deletable, folderId, onDelete } = this.props;
    return (
      <React.Fragment>
        <ConfirmDeleteWatcherFolder
          folderId={folderId}
          modalOpen={this.state.modalOpen}
          onClose={this.toggleModalOpen}
          onSubmit={onDelete}
        />
        <PageActions
          secondaryActions={[
            {
              content: 'Delete Folder',
              onAction: numWatchers > 0 ? this.toggleModalOpen : onDelete,
              destructive: true,
              disabled: !deletable
            }
          ]}
        />
      </React.Fragment>
    );
  }
}

export default WatcherFolderActions;
