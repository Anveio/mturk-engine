import * as React from 'react';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Set } from 'immutable';
import { massUnblockToast } from 'utils/toaster';
import { BlockedRequester } from 'types';

interface Props {
  readonly title: string;
  readonly entries: {
    readonly inThePast: {
      readonly hour: Set<BlockedRequester>;
      readonly day: Set<BlockedRequester>;
      readonly week: Set<BlockedRequester>;
    };
    readonly olderThan: {
      readonly thirtyDays: Set<BlockedRequester>;
      readonly sixtyDays: Set<BlockedRequester>;
      readonly ninetyDays: Set<BlockedRequester>;
    };
  };
}

interface Handlers {
  readonly onMenuClick: (ids: Set<string>) => void;
  readonly onUndo: (entries: Set<BlockedRequester>) => void;
}

class SweepMenu extends React.Component<Props & Handlers, never> {
  private static entriesToIdSet = (entries: Set<BlockedRequester>) =>
    entries.reduce(
      (acc: Set<string>, cur: BlockedRequester) => acc.add(cur.id),
      Set([])
    );

  private handleClickForEntries = (entries: Set<BlockedRequester>) => () => {
    const ids = SweepMenu.entriesToIdSet(entries);
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
