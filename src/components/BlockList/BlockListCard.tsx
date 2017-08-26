import * as React from 'react';
import { BlockedHit } from '../../types';
import { ResourceList } from '@shopify/polaris';

export interface Props {
  readonly item: BlockedHit;
  readonly onUnblock: (groupId: string) => void;
}

const BlockListCard = ({ item, onUnblock }: Props) => {
  const { title, requesterName, dateBlocked } = item;
  const handleUnblock = () => {
    onUnblock(item.groupId);
  };

  const actions = [
    {
      content: 'Return',
      accessibilityLabel: 'Return',
      onClick: handleUnblock
    }
  ];

  return (
    <ResourceList.Item
      actions={actions}
      attributeOne={requesterName}
      attributeTwo={title}
      attributeThree={`Blocked on: ${dateBlocked.toLocaleDateString()}`}
    />
  );
};

export default BlockListCard;
