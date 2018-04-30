import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, Stack, Heading, Button } from '@shopify/polaris';
import { RootState } from '../../types';
import BlockedRequesterTag from './BlockedRequesterTag';
import { Popover, Position } from '@blueprintjs/core';
import SweepMenu from './SweepMenu';
import { Set } from 'immutable';
import {
  recentlyBlockedRequesterIds,
  blockedRequesterIdsOlderThan
} from 'selectors/blocklists';
import {
  UnblockMultipleRequesters,
  unblockMultipleRequesters
} from 'actions/blockRequester';

interface Props {
  readonly blockedRequesterIds: {
    readonly recent: Set<string>;
    readonly olderThanThirtyDays: Set<string>;
    readonly olderThanSixtyDays: Set<string>;
    readonly olderThanNinetyDays: Set<string>;
  };
  readonly blocklistSize: number;
}

interface Handlers {
  readonly massUnblock: (ids: Set<string>) => void;
}

class RequesterBlockList extends React.Component<Props & Handlers, never> {
  public render() {
    const { blockedRequesterIds, blocklistSize, massUnblock } = this.props;
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
                    title={'Delete requesters...'}
                    onMenuClick={massUnblock}
                    entries={blockedRequesterIds}
                  />
                </Popover>
              </Stack.Item>
            </Stack>
            <Stack>
              {blockedRequesterIds.recent.map((id: string) => (
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
  blockedRequesterIds: {
    recent: recentlyBlockedRequesterIds(state),
    olderThanThirtyDays: blockedRequesterIdsOlderThan(30)(state),
    olderThanSixtyDays: blockedRequesterIdsOlderThan(60)(state),
    olderThanNinetyDays: blockedRequesterIdsOlderThan(90)(state)
  },
  blocklistSize: state.requesterBlocklist.size
});

const mapDispatch = (
  dispatch: Dispatch<UnblockMultipleRequesters>
): Handlers => ({
  massUnblock: (ids: Set<string>) => dispatch(unblockMultipleRequesters(ids))
});

export default connect(mapState, mapDispatch)(RequesterBlockList);
