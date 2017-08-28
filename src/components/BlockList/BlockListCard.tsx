import * as React from 'react';
import { BlockedHit } from '../../types';
import { ResourceList } from '@shopify/polaris';
import { truncate } from '../../utils/formatting';

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
      content: 'Unblock',
      accessibilityLabel: 'Unblock',
      onClick: handleUnblock
    }
  ];

  return (
    <ResourceList.Item
      actions={actions}
      attributeOne={truncate(requesterName, 30)}
      attributeTwo={truncate(title, 80)}
      attributeThree={`Blocked on: ${dateBlocked.toLocaleDateString()}`}
    />
  );
};

export default BlockListCard;
