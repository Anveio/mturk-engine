import * as React from 'react';
import { Button } from '@shopify/polaris';

export interface Handlers {
  readonly onBlockRequester: () => void;
}

class BlockActionsPopover extends React.PureComponent<Handlers, never> {
  public render() {
    return (
      <Button destructive size="slim" onClick={this.props.onBlockRequester}>
        Block Requester
      </Button>
    );
  }
}

export default BlockActionsPopover;
