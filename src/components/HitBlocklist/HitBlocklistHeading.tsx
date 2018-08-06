import * as React from 'react';
import { Heading, Stack, Button, ButtonGroup } from '@shopify/polaris';
import { connect } from 'react-redux';
import { RootState, BlockedHit } from 'types';
import { List, Set } from 'immutable';
import { Popover, Position } from '@blueprintjs/core';
import SweepMenu from '../Menu/SweepMenu';
import {
  unblockMultipleHits,
  blockMultipleHits,
  toggleHitBlocklistVisibility
} from 'actions/blockHit';
import { sortedHitBlocklist } from 'selectors/blocklists';

interface Props {
  readonly hitIds: List<BlockedHit>;
}

interface Handlers {
  readonly hideHitBlocklist: () => void;
  readonly massUnblock: (ids: Set<string>) => void;
  readonly undoMassUnblock: (hits: Set<BlockedHit>) => void;
}

class HitBlocklistView extends React.Component<Props & Handlers, never> {
  public render() {
    const { hitIds, massUnblock, undoMassUnblock } = this.props;

    return (
      <Stack>
        <Stack.Item fill>
          <Heading>Search blocked HITs ({hitIds.size} entries found)</Heading>
        </Stack.Item>
        <Stack.Item>
          <ButtonGroup>
            <Button plain>Hide</Button>
            <Popover position={Position.BOTTOM_RIGHT} canEscapeKeyClose>
              <Button plain disclosure>
                Sweep
              </Button>
              <SweepMenu
                kind="hit"
                title={'Unblock HITs...'}
                onMenuClick={massUnblock}
                onUndo={undoMassUnblock}
                blockedEntries={hitIds}
              />
            </Popover>
          </ButtonGroup>
        </Stack.Item>
      </Stack>
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitIds: sortedHitBlocklist(state)
});

const mapDispatch: Handlers = {
  hideHitBlocklist: toggleHitBlocklistVisibility,
  massUnblock: unblockMultipleHits,
  undoMassUnblock: blockMultipleHits
};

export default connect(
  mapState,
  mapDispatch
)(HitBlocklistView);
