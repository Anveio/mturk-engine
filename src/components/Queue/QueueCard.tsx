import * as React from 'react';
import { QueueItem } from '../../types';
import { ResourceList } from '@shopify/polaris';
import QueueItemInfo from './QueueItemInfo';
import { generateItemProps } from '../../utils/queueItem';

export interface Props {
  readonly hit: QueueItem;
  readonly onReturn: (hitID: string) => void;
}

const QueueCard = ({ hit, onReturn }: Props) => {
  const { hitId, reward, timeLeft } = hit;
  const handleReturn = () => {
    onReturn(hit.hitId);
  };

  const actions = [
    {
      content: 'Return',
      accessibilityLabel: 'Return',
      onClick: handleReturn
    },
    {
      primary: true,
      external: true,
      content: 'Work',
      accessibilityLabel: 'Work',
      url: `https://www.mturk.com/mturk/continue?hitId=${hitId}`
    }
  ];

  return (
    <ResourceList.Item
      actions={actions}
      {...generateItemProps(hit)}
      attributeThree={<QueueItemInfo reward={reward} timeLeft={timeLeft} />}
    />
  );
};

export default QueueCard;
