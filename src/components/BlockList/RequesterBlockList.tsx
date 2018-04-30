import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, Stack, Heading, Button } from '@shopify/polaris';
import { RootState, BlockedRequester } from '../../types';
import BlockedRequesterTag from './BlockedRequesterTag';
import { Popover, Position } from '@blueprintjs/core';
import SweepMenu from './SweepMenu';
import { Set, List } from 'immutable';
import {
  recentlyBlockedRequesters,
  blockedRequestersOlderThan
} from 'selectors/blocklists';
import {
  unblockMultipleRequesters,
  UnblockRequester,
  blockMultipleRequesters
} from 'actions/blockRequester';

interface Props {
  readonly blockedRequesters: {
    // recent needs to be displayed in order and Sets dont have a defined iteration order.
    readonly recent: List<BlockedRequester>;
    readonly olderThanThirtyDays: Set<BlockedRequester>;
    readonly olderThanSixtyDays: Set<BlockedRequester>;
    readonly olderThanNinetyDays: Set<BlockedRequester>;
  };
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
                    title={'Unblock requesters...'}
                    entries={blockedRequesters}
                    onMenuClick={massUnblock}
                    onUndo={undoMassUnblock}
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
    olderThanThirtyDays: blockedRequestersOlderThan(30)(state),
    olderThanSixtyDays: blockedRequestersOlderThan(60)(state),
    olderThanNinetyDays: blockedRequestersOlderThan(90)(state)
  },
  blocklistSize: state.requesterBlocklist.size
});

const mapDispatch = (dispatch: Dispatch<UnblockRequester>): Handlers => ({
  massUnblock: (ids: Set<string>) => dispatch(unblockMultipleRequesters(ids)),
  undoMassUnblock: (requesters: Set<BlockedRequester>) =>
    dispatch(blockMultipleRequesters(requesters))
});

export default connect(mapState, mapDispatch)(RequesterBlockList);
