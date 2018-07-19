import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, BlockedHit } from '../../types';
import { ResourceList, Stack, TextStyle } from '@shopify/polaris';
import { unblockSingleHit } from 'actions/blockHit';
import { Text } from '@blueprintjs/core';

interface Props {
  readonly blockedHit: BlockedHit;
}

interface OwnProps {
  readonly blockedHitId: string;
}

interface Handlers {
  readonly onUnblock: (groupId: string) => void;
}

class BlockedHitCard extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  public render() {
    const { title, requester, groupId, dateBlocked } = this.props.blockedHit;
    const actions = [
      {
        content: 'Unblock',
        accessibilityLabel: 'Unblock this HIT',
        onClick: () => this.props.onUnblock(groupId)
      }
    ];

    return (
      <ResourceList.Item
        id={groupId}
        onClick={console.log}
        shortcutActions={actions}
      >
        <Stack vertical={false} wrap={false}>
          <Stack.Item>
            <TextStyle variation="strong">
              <Text>{requester.name}</Text>
            </TextStyle>
          </Stack.Item>
          <Stack.Item fill>
            <Text ellipsize>{title}</Text>
          </Stack.Item>
          <Stack.Item>
            <p>Blocked on: {dateBlocked.toLocaleDateString()}</p>
          </Stack.Item>
        </Stack>
      </ResourceList.Item>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  blockedHit: state.hitBlocklist.get(ownProps.blockedHitId)
});

const mapDispatch: Handlers = {
  onUnblock: unblockSingleHit
};

export default connect(
  mapState,
  mapDispatch
)(BlockedHitCard);
