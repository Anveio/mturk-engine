import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, Stack } from '@shopify/polaris';
import { EditableText } from '@blueprintjs/core';
import {
  EditableField,
  WatcherEdit,
  editWatcher
} from '../../actions/editWatcher';
import { RootState, Watcher } from '../../types';
import {
  DeleteWatcher,
  ScheduleWatcherTick,
  scheduleWatcher,
  CancelWatcherTick,
  cancelNextWatcherTick,
  deleteWatcher
} from '../../actions/watcher';
import WatcherHeading from './WatcherHeading';
import WatcherInfo from './WatcherInfo';
import WatcherActions from './WatcherActions';

interface OwnProps {
  readonly watcherId: string;
}

interface Props {
  readonly watcher: Watcher;
  readonly watcherActive: boolean;
}

interface Handlers {
  readonly onDelete: (id: string) => void;
  readonly onSchedule: (id: string) => void;
  readonly onCancel: (id: string) => void;
  readonly onEdit: (
    id: string,
    field: EditableField,
    value: string | number
  ) => void;
}

class WatcherCard extends React.PureComponent<
  OwnProps & Props & Handlers,
  never
> {
  private static validateNumber = (value: string): boolean =>
    /^\d+$/.test(value);

  private handleDelete = () => this.props.onDelete(this.props.watcher.groupId);

  private handleToggle = () => {
    const { watcherActive, onCancel, watcherId, onSchedule } = this.props;
    watcherActive ? onCancel(watcherId) : onSchedule(watcherId);
  };

  private delaySection = (delay: number) => {
    return (
      <Card.Section>
        Delay:{' '}
        <EditableText
          intent={0}
          maxLength={3}
          value={delay.toString()}
          selectAllOnFocus
          onChange={(value: string) =>
            this.props.onEdit(
              this.props.watcherId,
              'delay',
              WatcherCard.validateNumber(value) || value === '' ? value : delay
            )
          }
          minWidth={10}
        />{' '}
        seconds
      </Card.Section>
    );
  };

  public render() {
    const { watcher, watcherActive } = this.props;

    return (
      <Stack vertical>
        <WatcherHeading
          title={watcher.title}
          onChange={(value: string) =>
            this.props.onEdit(this.props.watcherId, 'title', value)
          }
        />
        <WatcherInfo
          id={watcher.groupId}
          description={watcher.description}
          onChangeDescription={(value: string) =>
            this.props.onEdit(this.props.watcherId, 'description', value)
          }
        />
        <Card>{this.delaySection(watcher.delay)}</Card>
        <WatcherActions
          watcherActive={watcherActive}
          onDelete={this.handleDelete}
          onToggle={this.handleToggle}
        />
      </Stack>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  watcher: state.watchers.get(ownProps.watcherId),
  watcherActive: !!state.watcherTimes.get(ownProps.watcherId)
});

type WatcherCardAction =
  | ScheduleWatcherTick
  | CancelWatcherTick
  | DeleteWatcher
  | WatcherEdit;

const mapDispatch = (dispatch: Dispatch<WatcherCardAction>): Handlers => ({
  onDelete: (id: string) => dispatch(deleteWatcher(id)),
  onCancel: (id: string) => dispatch(cancelNextWatcherTick(id)),
  onSchedule: (id: string) => dispatch(scheduleWatcher(id)),
  onEdit: (id: string, field: EditableField, value: string | number) =>
    dispatch(editWatcher(id, field, value))
});

export default connect(mapState, mapDispatch)(WatcherCard);
