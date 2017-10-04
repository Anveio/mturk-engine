import * as React from 'react';
import { BlockedRequester } from '../../types';
import { Tag } from '@shopify/polaris';
import { truncate } from '../../utils/formatting';

export interface Props {
  readonly requester: BlockedRequester;
}

export interface OwnProps {
  readonly blockedRequesterId: string;
}

export interface Handlers {
  readonly onUnblock: (groupId: string) => void;
}

class BlockedHitCard extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  private handleUnblock = () => this.props.onUnblock(this.props.requester.id);

  public render() {
    return (
      <Tag onRemove={this.handleUnblock}>
        {truncate(this.props.requester.name, 30)}
      </Tag>
    );
  }
}

export default BlockedHitCard;
