import { Popover, Position } from '@blueprintjs/core';
import { Button, Card, Heading, Stack } from '@shopify/polaris';
import {
  UnblockRequester,
  blockMultipleRequesters,
  unblockMultipleRequesters
} from 'actions/blockRequester';
import { Duration } from 'constants/enums';
import { Set } from 'immutable';
import * as React from 'react';
import { Dispatch, connect } from 'react-redux';
import {
  blockedRequestersInLast,
  blockedRequestersOlderThan,
  recentlyBlockedRequesters
} from 'selectors/blocklists';
import { BlocklistProps } from 'utils/blocklist';
import { BlockedRequester, RootState } from '../../types';
import BlockedRequesterTag from './BlockedRequesterTag';
import SweepMenu from './SweepMenu';

interface Props {
  readonly blockedRequesters: BlocklistProps<BlockedRequester>;
  readonly blocklistSize: number;
}

interface Handlers {
  readonly massUnblock: (ids: Set<string>) => void;
  readonly undoMassUnblock: (requesters: Set<BlockedRequester>) => void;
}

class RequesterBlockList extends React.Component<Props & Handlers, never> {
  public render() {
    const {
      blockedRequesters,
      blocklistSize,
      massUnblock,
      undoMassUnblock
    } = this.props;
    return (
      blocklistSize > 0 && (
        <Card sectioned>
          <Stack vertical={true}>
            <Stack vertical={false}>
              <Stack.Item fill>
                <Heading>
                  Recently blocked requesters ({blocklistSize} total)
                </Heading>
              </Stack.Item>

              <Stack.Item>
                <Popover position={Position.BOTTOM_RIGHT} canEscapeKeyClose>
                  <Button plain disclosure>
                    Sweep
                  </Button>
                  <SweepMenu
                    kind="requester"
                    title={'Unblock requesters...'}
                    onMenuClick={massUnblock}
                    onUndo={undoMassUnblock}
                    {...blockedRequesters}
                  />
                </Popover>
              </Stack.Item>
            </Stack>
            <Stack>
              {blockedRequesters.recent.map(({ id }: BlockedRequester) => (
                <BlockedRequesterTag blockedRequesterId={id} key={id} />
              ))}
            </Stack>
          </Stack>
        </Card>
      )
    );
  }
}

const mapState = (state: RootState): Props => ({
  blockedRequesters: {
    recent: recentlyBlockedRequesters(state),
    entries: {
      inThePast: {
        hour: blockedRequestersInLast(1, Duration.HOURS)(state),
        day: blockedRequestersInLast(1, Duration.DAYS)(state),
        week: blockedRequestersInLast(1, Duration.WEEKS)(state),
        month: blockedRequestersInLast(1, Duration.MONTHS)(state)
      },
      olderThan: {
        thirtyDays: blockedRequestersOlderThan(30, Duration.DAYS)(state),
        sixtyDays: blockedRequestersOlderThan(60, Duration.DAYS)(state),
        ninetyDays: blockedRequestersOlderThan(90, Duration.DAYS)(state)
      }
    }
  },
  blocklistSize: state.requesterBlocklist.size
});

const mapDispatch = (dispatch: Dispatch<UnblockRequester>): Handlers => ({
  massUnblock: (ids: Set<string>) => dispatch(unblockMultipleRequesters(ids)),
  undoMassUnblock: (requesters: Set<BlockedRequester>) =>
    dispatch(blockMultipleRequesters(requesters))
});

export default connect(mapState, mapDispatch)(RequesterBlockList);
