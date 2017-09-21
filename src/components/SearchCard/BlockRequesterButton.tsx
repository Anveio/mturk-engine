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

export interface State {
  readonly hovering: boolean;
}

class BlockRequesterButton extends React.PureComponent<
  OwnProps & Handlers,
  State
> {
  state: State = {
    hovering: false
  };

  private handleBlockRequester = () => {
    this.props.onBlockRequester(blockedRequesterFactory(this.props.requester));
  };

  private handleMouseEnter = () => {
    this.setState({ hovering: true });
  };

  private handleMouseLeave = () => {
    this.setState({ hovering: false });
  };

  public render() {
    return (
      <Tooltip
        content="You can manage your blocked requesters in the Blocklist tab."
        position={Position.TOP_LEFT}
        isOpen={this.state.hovering}
      >
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Button destructive size="slim" onClick={this.handleBlockRequester}>
            Block Requester
          </Button>
        </div>
      </Tooltip>
    );
  }
}

export default BlockRequesterButton;
