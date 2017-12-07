import * as React from 'react';
import { Dialog } from '@blueprintjs/core';
import { Card } from '@shopify/polaris';

export interface Props {
  readonly modalOpen: boolean;
}

export interface Handlers {
  readonly onClose: () => void;
  readonly onToggleAll: (status: boolean) => void;
  readonly onSubmit: () => void;
}

class SelectSettingsDialog extends React.PureComponent<
  Props & Handlers,
  never
> {
  public render() {
    const { onClose, onSubmit, onToggleAll } = this.props;

    const primaryAction = {
      content: 'Confirm Selection & Import',
      icon: 'import',
      onAction: onSubmit
    };

    const secondaryAction = {
      content: 'Save Selection & Close',
      onAction: onClose
    };

    return (
      <Dialog
        isOpen={this.props.modalOpen}
        iconName="changes"
        title="Pick which settings you would like to import."
        onClose={this.props.onClose}
      >
        <Card
          sectioned
          title="Found the following settings..."
          primaryFooterAction={primaryAction}
          secondaryFooterAction={secondaryAction}
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
