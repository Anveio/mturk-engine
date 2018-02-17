import * as React from 'react';
import { PageActions } from '@shopify/polaris';

interface Props {
  readonly watcherActive: boolean;
  readonly onDelete: () => void;
  readonly onToggle: () => void;
}

class WatcherActions extends React.Component<Props, never> {
  public render() {
    return (
      <PageActions
        primaryAction={{
          content: this.props.watcherActive ? 'Stop' : 'Start',
          onAction: this.props.onToggle
        }}
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

export default WatcherActions;
