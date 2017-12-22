import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, QueueItem } from '../../types';
import { ResourceList } from '@shopify/polaris';
import QueueItemInfo from './QueueItemInfo';
import { ReturnAction, returnHitRequest } from '../../actions/return';
import { generateItemProps } from '../../utils/queueItem';
import { generateContinueWorkUrl } from '../../utils/urls';

export interface Props {
  readonly hit: QueueItem;
  readonly legacyLinksEnabled: boolean;
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
  public render() {
    const { hit, legacyLinksEnabled } = this.props;
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
        url: generateContinueWorkUrl(hit, legacyLinksEnabled)
      }
    ];

    return (
      <ResourceList.Item
        actions={actions}
        {...generateItemProps(hit)}
        attributeThree={
          <QueueItemInfo reward={reward} timeLeft={timeLeftInSeconds} />
          // tslint:disable-next-line:jsx-curly-spacing
        }
      />
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.queue.get(ownProps.hitId),
  legacyLinksEnabled: state.legacyLinksEnabled
});

const mapDispatch = (dispatch: Dispatch<ReturnAction>): Handlers => ({
  onReturn: (queueItem: QueueItem) => dispatch(returnHitRequest(queueItem))
});

export default connect(mapState, mapDispatch)(QueueItemCard);
