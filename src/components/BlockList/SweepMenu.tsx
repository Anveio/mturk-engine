import * as React from 'react';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Set } from 'immutable';

interface Props {
  readonly title: string;
  readonly entries: {
    readonly olderThanThirtyDays: Set<string>;
    readonly olderThanSixtyDays: Set<string>;
    readonly olderThanNinetyDays: Set<string>;
  };
}

interface Handlers {
  readonly onMenuClick: (ids: Set<string>) => void;
}

class SweepMenu extends React.Component<Props & Handlers, never> {
  private handleClickForEntries = (entries: Set<string>) => () =>
    this.props.onMenuClick(entries);

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
