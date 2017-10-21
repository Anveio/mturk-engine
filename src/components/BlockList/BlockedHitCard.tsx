import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, BlockedHit } from '../../types';
import { ResourceList } from '@shopify/polaris';
import { BlockHitAction, unblockHitGroup } from '../../actions/blockHitGroup';
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

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  blockedHit: state.hitBlocklist.get(ownProps.blockedHitId)
});

const mapDispatch = (dispatch: Dispatch<BlockHitAction>): Handlers => ({
  onUnblock: (groupId: string) => dispatch(unblockHitGroup(groupId))
});

export default connect(mapState, mapDispatch)(BlockedHitCard);
