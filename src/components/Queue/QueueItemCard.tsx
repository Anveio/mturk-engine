import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, QueueItem } from '../../types';
import { ResourceList } from '@shopify/polaris';
import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';
import QueueItemInfo from './QueueItemInfo';
import { ReturnAction, returnHitRequest } from '../../actions/return';
import { generateContinueWorkUrl } from '../../utils/urls';
import { truncate } from 'utils/formatting';

export interface Props {
  readonly hit: QueueItem;
}

export interface OwnProps {
  readonly hitId: string;
}

export interface Handlers {
  readonly onReturn: (queueItem: QueueItem) => void;
}

class QueueItemCard extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  private static generateItemProps = (hit: QueueItem): ItemProps => {
    const { requester, title } = hit;
    return {
      attributeOne: truncate(requester.name, 40),
      attributeTwo: truncate(title, 75)
    };
  };

  public render() {
    const { hit } = this.props;
    const { reward, timeLeftInSeconds } = hit;
    const actions = [
      {
        content: 'Return',
        accessibilityLabel: 'Return',
        onClick: () => this.props.onReturn(hit)
      },
      {
        external: true,
        content: 'Work',
        accessibilityLabel: 'Work',
        url: generateContinueWorkUrl(hit)
      }
    ];

    return (
      <ResourceList.Item
        actions={actions}
        {...QueueItemCard.generateItemProps(hit)}
        attributeThree={
          <QueueItemInfo reward={reward} timeLeft={timeLeftInSeconds} />
          // tslint:disable-next-line:jsx-curly-spacing
        }
      />
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.queue.get(ownProps.hitId)
});

const mapDispatch = (dispatch: Dispatch<ReturnAction>): Handlers => ({
  onReturn: (queueItem: QueueItem) => dispatch(returnHitRequest(queueItem))
});

export default connect(mapState, mapDispatch)(QueueItemCard);
