import * as React from 'react';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Set } from 'immutable';
import { massUnblockToast } from 'utils/toaster';
import { BlockedRequester } from 'types';

interface Props {
  readonly title: string;
  readonly entries: {
    readonly olderThanThirtyDays: Set<BlockedRequester>;
    readonly olderThanSixtyDays: Set<BlockedRequester>;
    readonly olderThanNinetyDays: Set<BlockedRequester>;
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
      entries: { olderThanThirtyDays, olderThanSixtyDays, olderThanNinetyDays }
    } = this.props;
    return (
      <Menu>
        <MenuDivider title={title} />
        <MenuItem
          icon="time"
          onClick={this.handleClickForEntries(olderThanThirtyDays)}
          text="Older than 30 days"
        />
        <MenuItem
          icon="time"
          onClick={this.handleClickForEntries(olderThanSixtyDays)}
          text="Older than 60 days"
        />
        <MenuItem
          icon="time"
          onClick={this.handleClickForEntries(olderThanNinetyDays)}
          text="Older than 90 days"
        />
      </Menu>
    );
  }
}

export default SweepMenu;
