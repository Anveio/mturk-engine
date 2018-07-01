import { Popover, Position } from '@blueprintjs/core';
import { Button, Card, Heading, ResourceList, Stack } from '@shopify/polaris';
import {
  blockMultipleHits,
  unblockMultipleHits,
  BlockHitAction
} from 'actions/blockHit';
import { Set, List } from 'immutable';
import * as React from 'react';
import { Dispatch, connect } from 'react-redux';
import { BlockedHit, RootState } from '../../types';
import BlockedHitCard from './BlockedHitCard';
import SweepMenu from './SweepMenu';
import { sortedHitBlocklist } from 'selectors/blocklists';

interface Props {
  readonly blockedHitsSortedRecentFirst: List<BlockedHit>;
  readonly blocklistSize: number;
}

interface Handlers {
  readonly massUnblock: (ids: Set<string>) => void;
  readonly undoMassUnblock: (requesters: Set<BlockedHit>) => void;
}

class HitBlockList extends React.Component<Props & Handlers, never> {
  public render() {
    const {
      blocklistSize,
      blockedHitsSortedRecentFirst,
      massUnblock,
      undoMassUnblock
    } = this.props;
    return (
      blocklistSize > 0 && (
        <Card>
          <Card.Section>
            <Stack vertical={false}>
              <Stack.Item fill>
                <Heading>Recently blocked HITs ({blocklistSize} total)</Heading>
              </Stack.Item>

              <Stack.Item>
                <Popover position={Position.BOTTOM_RIGHT} canEscapeKeyClose>
                  <Button plain disclosure>
                    Sweep
                  </Button>
                  <SweepMenu
                    kind="hit"
                    title={'Unblock HITs...'}
                    onMenuClick={massUnblock}
                    onUndo={undoMassUnblock}
                    blockedEntries={blockedHitsSortedRecentFirst}
                  />
                </Popover>
              </Stack.Item>
            </Stack>
          </Card.Section>
          <ResourceList
            items={blockedHitsSortedRecentFirst.slice(0, 20).toArray()}
            renderItem={({ groupId }: BlockedHit) => (
              <BlockedHitCard key={groupId} blockedHitId={groupId} />
            )}
          />
        </Card>
      )
    );
  }
}

const mapState = (state: RootState): Props => ({
  blockedHitsSortedRecentFirst: sortedHitBlocklist(state),
  blocklistSize: state.hitBlocklist.size
});

const mapDispatch: Handlers = {
  massUnblock: unblockMultipleHits,
  undoMassUnblock: blockMultipleHits
};

export default connect(mapState, mapDispatch)(HitBlockList);
