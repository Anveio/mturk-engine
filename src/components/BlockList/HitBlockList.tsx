import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, BlockedHit } from '../../types';
import { Card, Stack, Heading, Button, ResourceList } from '@shopify/polaris';
import { Popover, Position } from '@blueprintjs/core';
import BlockedHitCard from './BlockedHitCard';
import {
  recentlyBlockedHits,
  blockedHitsInLast,
  blockedHitsOlderThan
} from 'selectors/blocklists';
import SweepMenu from './SweepMenu';
import { Set, List } from 'immutable';
import {
  UnblockHit,
  unblockMultipleHits,
  blockMultipleHits
} from 'actions/blockHit';
import {
  SECONDS_IN_HOUR,
  SECONDS_IN_DAY,
  SECONDS_IN_WEEK
} from 'constants/dates';
import { TimeUnit } from 'constants/enums';

interface Props {
  readonly blockedHits: {
    // recent needs to be displayed in order and Sets dont have a defined iteration order.
    readonly recent: List<BlockedHit>;
    readonly entries: {
      readonly inThePast: {
        readonly hour: Set<BlockedHit>;
        readonly day: Set<BlockedHit>;
        readonly week: Set<BlockedHit>;
      };
      readonly olderThan: {
        readonly thirtyDays: Set<BlockedHit>;
        readonly sixtyDays: Set<BlockedHit>;
        readonly ninetyDays: Set<BlockedHit>;
      };
    };
  };
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
                    entries={blockedHits.entries}
                    onMenuClick={massUnblock}
                    onUndo={undoMassUnblock}
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
        hour: blockedHitsInLast(SECONDS_IN_HOUR, TimeUnit.SECONDS)(state),
        day: blockedHitsInLast(SECONDS_IN_DAY, TimeUnit.SECONDS)(state),
        week: blockedHitsInLast(SECONDS_IN_WEEK, TimeUnit.SECONDS)(state)
      },
      olderThan: {
        thirtyDays: blockedHitsOlderThan(30, TimeUnit.DAYS)(state),
        sixtyDays: blockedHitsOlderThan(60, TimeUnit.DAYS)(state),
        ninetyDays: blockedHitsOlderThan(90, TimeUnit.DAYS)(state)
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
