import * as React from 'react';
import { QueueItem } from '../../types';
import { ResourceList } from '@shopify/polaris';
import QueueItemInfo from './QueueItemInfo';
import { generateItemProps } from '../../utils/queueItem';

export interface Props {
  readonly hit: QueueItem;
}

export interface Handlers {
  readonly onReturn: (hitID: string) => void;
}

class QueueCard extends React.PureComponent<Props & Handlers, never> {
  private handleReturn = () => {
    this.props.onReturn(this.props.hit.hitId);
  };

  public render() {
    const { hitId, reward, timeLeft } = this.props.hit;
    const actions = [
      {
        content: 'Return',
        accessibilityLabel: 'Return',
        onClick: this.handleReturn
      },
      {
        external: true,
        content: 'Work',
        accessibilityLabel: 'Work',
        url: `https://www.mturk.com/mturk/continue?hitId=${hitId}`
      }
    ];

    return (
      <ResourceList.Item
        actions={actions}
        {...generateItemProps(this.props.hit)}
        attributeThree={<QueueItemInfo reward={reward} timeLeft={timeLeft} />}
      />
    );
  }
}

export default QueueCard;
