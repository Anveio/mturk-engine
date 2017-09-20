import * as React from 'react';
import { BlockedHit } from '../../types';
import { ResourceList } from '@shopify/polaris';
import { truncate } from '../../utils/formatting';

export interface Props {
  readonly blockedHit: BlockedHit;
}

export interface OwnProps {
  readonly blockedHitId: string;
}

export interface Handlers {
  readonly onUnblock: (groupId: string) => void;
}

class BlockedHitCard extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  public render() {
    const { title, requester, dateBlocked, groupId } = this.props.blockedHit;
    const actions = [
      {
        content: 'Unblock',
        accessibilityLabel: 'Unblock this HIT',
        onClick: () => this.props.onUnblock(groupId)
      }
    ];

    return (
      <ResourceList.Item
        actions={actions}
        attributeOne={truncate(requester.name, 30)}
        attributeTwo={truncate(title, 80)}
        attributeThree={`Blocked on: ${dateBlocked.toLocaleDateString()}`}
      />
    );
  }
}

export default BlockedHitCard;
