import * as React from 'react';
import { Heading, Stack, Button } from '@shopify/polaris';
import { connect } from 'react-redux';
import { RootState, BlockedHit } from 'types';
import { List, Set } from 'immutable';
import { Popover, Position } from '@blueprintjs/core';
import SweepMenu from './SweepMenu';
import { unblockMultipleHits, blockMultipleHits } from 'actions/blockHit';

interface Props {
  readonly hitIds: List<BlockedHit>;
}

interface Handlers {
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
        </Stack.Item>
      </Stack>
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitIds: state.hitBlocklist.toList()
});

const mapDispatch: Handlers = {
  massUnblock: unblockMultipleHits,
  undoMassUnblock: blockMultipleHits
};

export default connect(
  mapState,
  mapDispatch
)(HitBlocklistView);
