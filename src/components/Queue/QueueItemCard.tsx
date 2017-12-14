import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, QueueItem } from '../../types';
import { ResourceList } from '@shopify/polaris';
import QueueItemInfo from './QueueItemInfo';
import { ReturnAction, returnHitRequest } from '../../actions/return';
import { generateItemProps } from '../../utils/queueItem';

export interface Props {
  readonly hit: QueueItem;
}

export interface OwnProps {
  readonly hitId: string;
}

export interface Handlers {
  readonly onReturn: (hitID: string) => void;
}

class QueueItemCard extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  public render() {
    const { hitId, reward, timeLeftInSeconds } = this.props.hit;
    const actions = [
      {
        content: 'Return',
        accessibilityLabel: 'Return',
        onClick: () => this.props.onReturn(hitId)
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
        attributeThree={<QueueItemInfo reward={reward} timeLeft={timeLeftInSeconds} />}
      />
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.queue.get(ownProps.hitId)
});

const mapDispatch = (dispatch: Dispatch<ReturnAction>): Handlers => ({
  onReturn: (hitId: string) => dispatch(returnHitRequest(hitId))
});

export default connect(mapState, mapDispatch)(QueueItemCard);
