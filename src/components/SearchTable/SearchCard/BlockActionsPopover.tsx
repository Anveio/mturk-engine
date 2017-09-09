import * as React from 'react';
import { Button, Tooltip } from '@shopify/polaris';

export interface Handlers {
  readonly onBlockRequester: () => void;
}

class BlockActionsPopover extends React.PureComponent<Handlers, never> {
  public render() {
    return (
      <Tooltip content="You can manage your blocked requesters in the Blocklist tab. ">
        <Button destructive size="slim" onClick={this.props.onBlockRequester}>
          Block Requester
        </Button>
      </Tooltip>
    );
  }
}

export default BlockActionsPopover;
