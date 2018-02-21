import * as React from 'react';
import { PageActions } from '@shopify/polaris';

interface Props {
  readonly onDelete: () => void;
}

class WatcherFolderActions extends React.Component<Props, never> {
  public render() {
    return (
      <PageActions
        secondaryActions={[
          {
            content: 'Delete',
            onAction: this.props.onDelete,
            destructive: true
          }
        ]}
      />
    );
  }
}

export default WatcherFolderActions;
