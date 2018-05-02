import * as React from 'react';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Set } from 'immutable';
import { massUnblockToast } from 'utils/toaster';
import { BlockedEntry, BlockedHit, BlockedRequester } from 'types';

interface Props {
  readonly title: string;
  readonly kind: 'requester' | 'hit';
  readonly entries: {
    readonly inThePast: {
      readonly hour: Set<BlockedEntry>;
      readonly day: Set<BlockedEntry>;
      readonly week: Set<BlockedEntry>;
    };
    readonly olderThan: {
      readonly thirtyDays: Set<BlockedEntry>;
      readonly sixtyDays: Set<BlockedEntry>;
      readonly ninetyDays: Set<BlockedEntry>;
    };
  };
}

interface Handlers {
  readonly onMenuClick: (ids: Set<string>) => void;
  readonly onUndo: (entries: Set<BlockedEntry>) => void;
}

class SweepMenu extends React.Component<Props & Handlers, never> {
  private static blockedRequestersToIdSet = (entries: Set<BlockedRequester>) =>
    entries.reduce(
      (acc: Set<string>, cur: BlockedRequester) => acc.add(cur.id),
      Set([])
    );

  private static blockedHitsToIdSet = (entries: Set<BlockedHit>) =>
    entries.reduce(
      (acc: Set<string>, cur: BlockedHit) => acc.add(cur.groupId),
      Set([])
    );

  private handleClickForEntries = (entries: Set<BlockedEntry>) => () => {
    const ids =
      this.props.kind === 'requester'
        ? SweepMenu.blockedRequestersToIdSet(entries as Set<BlockedRequester>)
        : SweepMenu.blockedHitsToIdSet(entries as Set<BlockedHit>);
    this.props.onMenuClick(ids);
    massUnblockToast(() => this.props.onUndo(entries), entries.size);
  };

  public render() {
    const {
      title,
      entries: { olderThan, inThePast }
    } = this.props;
    return (
      <Menu>
        <MenuDivider title={title} />
        <MenuItem text="In the past">
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(inThePast.hour)}
            text="Hour"
          />
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(inThePast.day)}
            text="24 hours"
          />
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(inThePast.week)}
            text="7 days"
          />
        </MenuItem>
        <MenuItem text="Older than">
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(olderThan.thirtyDays)}
            text="30 days"
          />
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(olderThan.sixtyDays)}
            text="60 days"
          />
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(olderThan.ninetyDays)}
            text="90 days"
          />
        </MenuItem>
      </Menu>
    );
  }
}

export default SweepMenu;
