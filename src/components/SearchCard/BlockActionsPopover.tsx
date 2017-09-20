import * as React from 'react';
import { Requester, BlockedRequester } from '../../types';
import { Button } from '@shopify/polaris';
import { Tooltip, Position } from '@blueprintjs/core';
import { blockedRequesterFactory } from '../../utils/blocklist';

export interface OwnProps {
  readonly requester: Requester;
}

export interface Handlers {
  readonly onBlockRequester: (requester: BlockedRequester) => void;
}

class BlockActionsPopover extends React.PureComponent<
  OwnProps & Handlers,
  never
> {
  private handleBlockRequester = () => {
    this.props.onBlockRequester(blockedRequesterFactory(this.props.requester));
  };

  public render() {
    return (
      <Tooltip
        content="You can manage your blocked requesters in the Blocklist tab."
        position={Position.TOP_LEFT}
      >
        <Button destructive size="slim" onClick={this.handleBlockRequester}>
          Block Requester
        </Button>
      </Tooltip>
    );
  }
}

export default BlockActionsPopover;
