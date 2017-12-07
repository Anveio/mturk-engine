import * as React from 'react';
import { Dialog } from '@blueprintjs/core';
import { Card } from '@shopify/polaris';

export interface Props {
  readonly modalOpen: boolean;
}

export interface Handlers {
  readonly onClose: () => void;
  readonly onToggleAll: (status: boolean) => void;
}

class SelectSettingsDialog extends React.PureComponent<
  Props & Handlers,
  never
> {
  public render() {
    const { onClose, onToggleAll } = this.props;
    return (
      <Dialog
        isOpen={this.props.modalOpen}
        iconName="changes"
        title="Pick which settings you would like to import."
        onClose={this.props.onClose}
      >
        <Card
          sectioned
          title="The following settings were found:"
          primaryFooterAction={{
            content: 'Close',
            onAction: onClose
          }}
          actions={[
            {
              content: 'Uncheck all',
              onAction: () => onToggleAll(false)
            },
            {
              content: 'Check all',
              onAction: () => onToggleAll(true)
            }
          ]}
        >
          {this.props.children}
        </Card>
      </Dialog>
    );
  }
}

export default SelectSettingsDialog;
