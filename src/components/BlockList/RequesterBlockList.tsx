import { Popover, Position } from '@blueprintjs/core';
import { Button, Card, Heading, Stack } from '@shopify/polaris';
import {
  blockMultipleRequesters,
  unblockMultipleRequesters,
  BlockRequesterAction
} from 'actions/blockRequester';
import { Set, List } from 'immutable';
import * as React from 'react';
import { Dispatch, connect } from 'react-redux';
import { BlockedRequester, RootState } from '../../types';
import BlockedRequesterTag from './BlockedRequesterTag';
import SweepMenu from './SweepMenu';
import { sortedRequesterBlockList } from 'selectors/blocklists';

interface Props {
  readonly blockedRequestersSortedRecentFirst: List<BlockedRequester>;
  readonly blocklistSize: number;
}

interface Handlers {
  readonly massUnblock: (ids: Set<string>) => void;
  readonly undoMassUnblock: (requesters: Set<BlockedRequester>) => void;
}

class RequesterBlockList extends React.Component<Props & Handlers, never> {
  public render() {
    const {
      blockedRequestersSortedRecentFirst,
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
                    blockedEntries={blockedRequestersSortedRecentFirst}
                  />
                </Popover>
              </Stack.Item>
            </Stack>
            <Stack>
              {blockedRequestersSortedRecentFirst
                .slice(0, 30)
                .map(({ id }: BlockedRequester) => (
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
  blockedRequestersSortedRecentFirst: sortedRequesterBlockList(state),
  blocklistSize: state.requesterBlocklist.size
});

const mapDispatch = (dispatch: Dispatch<BlockRequesterAction>): Handlers => ({
  massUnblock: (ids: Set<string>) => dispatch(unblockMultipleRequesters(ids)),
  undoMassUnblock: (requesters: Set<BlockedRequester>) =>
    dispatch(blockMultipleRequesters(requesters))
});

export default connect(mapState, mapDispatch)(RequesterBlockList);
