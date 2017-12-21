import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, Stack, Tooltip, Heading, Button } from '@shopify/polaris';
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
import WatcherTimer from './WatcherTimer';

export interface OwnProps {
  readonly watcherId: string;
}

export interface Props {
  readonly watcher: Watcher;
  readonly watcherActive: boolean;
}

export interface Handlers {
  readonly onDelete: (id: string) => void;
  readonly onSchedule: (id: string, timeNextSearch: Date) => void;
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
  private static generateButtonContent = (active: boolean) =>
    active ? 'Stop' : 'Start';

  private static validateNumber = (value: string): boolean =>
    /^\d+$/.test(value);

  private handleDelete = () => this.props.onDelete(this.props.watcher.groupId);

  private handleToggle = () => {
    const {
      watcherActive,
      onCancel,
      watcherId,
      onSchedule,
      watcher
    } = this.props;
    watcherActive
      ? onCancel(watcherId)
      : onSchedule(watcherId, new Date(Date.now() + watcher.delay));
  };

  private headingSection = (title: string) => {
    return (
      <Card.Section>
        <Stack vertical spacing="tight">
          <Heading>
            <EditableText
              intent={0}
              maxLength={80}
              value={title}
              selectAllOnFocus
              placeholder="Click to edit title"
              onChange={(value: string) =>
                this.props.onEdit(this.props.watcherId, 'title', value)
              }
            />
          </Heading>
          <WatcherTimer
            groupId={this.props.watcherId}
            active={this.props.watcherActive}
          />
        </Stack>
      </Card.Section>
    );
  };

  private descriptionSection = (description: string) => {
    return (
      <Card.Section>
        <EditableText
          maxLength={140}
          value={this.props.watcher.description}
          maxLines={4}
          multiline
          selectAllOnFocus
          onChange={(value: string) =>
            this.props.onEdit(this.props.watcherId, 'description', value)
          }
          placeholder={`ID starts with ${this.props.watcherId.slice(
            0,
            5
          )}. Click to edit description`}
        />
      </Card.Section>
    );
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

  private buttonSection = (watcher: Watcher, active: boolean) => {
    return (
      <Card.Section>
        <Stack distribution="equalSpacing">
          <Button destructive={active} onClick={this.handleToggle}>
            {WatcherCard.generateButtonContent(active)}
          </Button>

          <Tooltip content="Delete this watcher.">
            <Button
              disabled={active}
              onClick={this.handleDelete}
              icon="delete"
            />
          </Tooltip>
        </Stack>
      </Card.Section>
    );
  };

  public render() {
    const { watcher, watcherActive } = this.props;

    return (
      <Card>
        {this.headingSection(watcher.title)}
        {this.descriptionSection(watcher.description)}
        {this.delaySection(watcher.delay)}
        {this.buttonSection(watcher, watcherActive)}
      </Card>
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
  onSchedule: (id: string, timeNextSearch: Date) =>
    dispatch(scheduleWatcher(id, timeNextSearch)),
  onEdit: (id: string, field: EditableField, value: string | number) =>
    dispatch(editWatcher(id, field, value))
});

export default connect(mapState, mapDispatch)(WatcherCard);
