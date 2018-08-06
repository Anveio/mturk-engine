import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Set, List } from 'immutable';
import * as React from 'react';
import { BlockedEntry, BlockedHit, BlockedRequester } from 'types';
import { BlocklistProps } from 'utils/blocklist';
import { massUnblockToast, showPlainToast } from 'utils/toaster';
import {
  DurationUnit,
  DateComparatorFunction,
  youngerThan,
  olderThan
} from 'utils/dates';
import { Duration } from 'constants/enums';

interface Props extends BlocklistProps<BlockedEntry> {
  readonly title: string;
  readonly kind: 'requester' | 'hit';
}

interface Handlers {
  readonly onMenuClick: (ids: Set<string>) => void;
  readonly onUndo: (entries: Set<BlockedEntry>) => void;
}

class SweepMenu extends React.Component<Props & Handlers, never> {
  private static blockedEntriesInTimeSpan = <T extends BlockedEntry>(
    entries: List<T>,
    comparatorFunction: DateComparatorFunction
  ) => (now: Date, duration: number, unit: DurationUnit) =>
    entries.filter((entry: T) =>
      comparatorFunction(entry.dateBlocked, duration, now, unit)
    );

  private static blockedRequestersToIdSet = (entries: List<BlockedRequester>) =>
    entries.reduce(
      (acc: Set<string>, cur: BlockedRequester) => acc.add(cur.id),
      Set([])
    );

  private static blockedHitsToIdSet = (entries: List<BlockedHit>) =>
    entries.reduce(
      (acc: Set<string>, cur: BlockedHit) => acc.add(cur.groupId),
      Set([])
    );

  private handleClickForEntries = (
    comparatorFunction: DateComparatorFunction,
    duration: number,
    unit: DurationUnit
  ) => () => {
    const {
      blockedEntriesInTimeSpan,
      blockedRequestersToIdSet,
      blockedHitsToIdSet
    } = SweepMenu;

    const entriesInTimeSpan = blockedEntriesInTimeSpan(
      this.props.blockedEntries,
      comparatorFunction
    )(new Date(), duration, unit);

    const ids =
      this.props.kind === 'requester'
        ? blockedRequestersToIdSet(entriesInTimeSpan as List<BlockedRequester>)
        : blockedHitsToIdSet(entriesInTimeSpan as List<BlockedHit>);

    if (ids.size === 0) {
      showPlainToast(
        `Nothing was blocked in the selected time period. Your blocklist remains unchanged.`
      );
      return;
    }

    this.props.onMenuClick(ids.toSet());
    massUnblockToast(
      () => this.props.onUndo(entriesInTimeSpan.toSet()),
      entriesInTimeSpan.size
    );
  };

  public render() {
    const { title } = this.props;
    return (
      <Menu>
        <MenuDivider title={title} />
        <MenuItem text="In the past">
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(youngerThan, 1, Duration.HOURS)}
            text="Hour"
          />
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(youngerThan, 1, Duration.DAYS)}
            text="24 hours"
          />
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(youngerThan, 7, Duration.DAYS)}
            text="7 days"
          />
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(youngerThan, 30, Duration.DAYS)}
            text="30 days"
          />
        </MenuItem>
        <MenuItem text="Older than">
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(olderThan, 30, Duration.DAYS)}
            text="30 days"
          />
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(olderThan, 60, Duration.DAYS)}
            text="60 days"
          />
          <MenuItem
            icon="time"
            onClick={this.handleClickForEntries(olderThan, 90, Duration.DAYS)}
            text="90 days"
          />
        </MenuItem>
      </Menu>
    );
  }
}

export default SweepMenu;
