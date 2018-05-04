import { Popover, Position } from '@blueprintjs/core';
import { Button, Card, Heading, ResourceList, Stack } from '@shopify/polaris';
import {
  UnblockHit,
  blockMultipleHits,
  unblockMultipleHits
} from 'actions/blockHit';
import { Duration } from 'constants/enums';
import { Set } from 'immutable';
import * as React from 'react';
import { Dispatch, connect } from 'react-redux';
import {
  blockedHitsInLast,
  blockedHitsOlderThan,
  recentlyBlockedHits
} from 'selectors/blocklists';
import { BlocklistProps } from 'utils/blocklist';
import { BlockedHit, RootState } from '../../types';
import BlockedHitCard from './BlockedHitCard';
import SweepMenu from './SweepMenu';

interface Props {
  readonly blockedHits: BlocklistProps<BlockedHit>;
  readonly blocklistSize: number;
}

interface Handlers {
  readonly massUnblock: (ids: Set<string>) => void;
  readonly undoMassUnblock: (requesters: Set<BlockedHit>) => void;
}

class HitBlockList extends React.PureComponent<Props & Handlers, never> {
  public render() {
    const {
      blocklistSize,
      blockedHits,
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
                    {...blockedHits}
                  />
                </Popover>
              </Stack.Item>
            </Stack>
          </Card.Section>
          <ResourceList
            items={blockedHits.recent.toArray()}
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
  blockedHits: {
    recent: recentlyBlockedHits(state),
    entries: {
      inThePast: {
        hour: blockedHitsInLast(1, Duration.HOURS)(state),
        day: blockedHitsInLast(1, Duration.DAYS)(state),
        week: blockedHitsInLast(1, Duration.WEEKS)(state),
        month: blockedHitsInLast(1, Duration.MONTHS)(state)
      },
      olderThan: {
        thirtyDays: blockedHitsOlderThan(30, Duration.DAYS)(state),
        sixtyDays: blockedHitsOlderThan(60, Duration.DAYS)(state),
        ninetyDays: blockedHitsOlderThan(90, Duration.DAYS)(state)
      }
    }
  },
  blocklistSize: state.hitBlocklist.size
});

const mapDispatch = (dispatch: Dispatch<UnblockHit>): Handlers => ({
  massUnblock: (ids: Set<string>) => dispatch(unblockMultipleHits(ids)),
  undoMassUnblock: (hits: Set<BlockedHit>) => dispatch(blockMultipleHits(hits))
});

export default connect(mapState, mapDispatch)(HitBlockList);
