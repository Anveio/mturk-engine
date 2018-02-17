import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, Stack, Button } from '@shopify/polaris';
import { Tooltip } from '@blueprintjs/core';
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

export interface OwnProps {
  readonly watcherId: string;
}

export interface Props {
  readonly watcher: Watcher;
  readonly watcherActive: boolean;
}

export interface Handlers {
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
  private static generateButtonContent = (active: boolean) =>
    active ? 'Stop' : 'Start';

  private static validateNumber = (value: string): boolean =>
    /^\d+$/.test(value);

  private handleDelete = () => this.props.onDelete(this.props.watcher.groupId);

  private handleToggle = () => {
    const { watcherActive, onCancel, watcherId, onSchedule } = this.props;
    watcherActive ? onCancel(watcherId) : onSchedule(watcherId);
  };

  // private headingSection = (title: string) => {
  //   return (
  //     <Card.Section>
  //       <Stack vertical spacing="tight">
  //         <Heading>
  //           <EditableText
  //             intent={0}
  //             maxLength={80}
  //             value={title}
  //             selectAllOnFocus
  //             placeholder="Click to edit title"
  //             onChange={(value: string) =>
  //               this.props.onEdit(this.props.watcherId, 'title', value)
  //             }
  //           />
  //         </Heading>
  //         <WatcherTimer id={this.props.watcherId} />
  //       </Stack>
  //     </Card.Section>
  //   );
  // };
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
            <Button onClick={this.handleDelete} icon="delete" />
          </Tooltip>
        </Stack>
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
        <Card>
          {this.delaySection(watcher.delay)}
          {this.buttonSection(watcher, watcherActive)}
        </Card>
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
