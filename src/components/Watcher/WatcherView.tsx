import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Stack } from '@shopify/polaris';
import { RootState, Primitive } from '../../types';
import {
  scheduleWatcher,
  cancelNextWatcherTick,
  deleteWatcher,
  EditableWatcherField,
  WatcherAction,
  editWatcher
} from '../../actions/watcher';
import WatcherHeading from './WatcherHeading';
import WatcherInfo from './WatcherInfo';
import WatcherSettings from './WatcherSettings';
import InfoCallout from './InfoCallout';
import WatcherActions from './WatcherActions';
import WatcherProgressBar from './WatcherProgressBar';

interface OwnProps {
  readonly watcherId: string;
}

interface Props {
  readonly watcherActive: boolean;
}

interface Handlers {
  readonly onDelete: (id: string) => void;
  readonly onSchedule: (id: string) => void;
  readonly onCancel: (id: string) => void;
  readonly onEdit: (
    id: string,
    field: EditableWatcherField,
    value: string | number
  ) => void;
}

class WatcherView extends React.PureComponent<
  OwnProps & Props & Handlers,
  never
> {
  private handleDelete = () => this.props.onDelete(this.props.watcherId);

  private handleToggle = () => {
    const { watcherActive, onCancel, watcherId, onSchedule } = this.props;
    watcherActive ? onCancel(watcherId) : onSchedule(watcherId);
  };

  public render() {
    const { watcherId, watcherActive } = this.props;

    return (
      <Stack vertical>
        <WatcherHeading
          watcherId={watcherId}
          onChange={(value: string) =>
            this.props.onEdit(this.props.watcherId, 'title', value)
          }
        />
        <WatcherInfo
          watcherId={watcherId}
          onChangeDescription={(value: string) =>
            this.props.onEdit(this.props.watcherId, 'description', value)
          }
        />
        <WatcherSettings
          watcherId={watcherId}
          onEdit={this.props.onEdit}
          onToggle={this.handleToggle}
        />
        <InfoCallout />
        <WatcherProgressBar id={watcherId} />
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
  watcherActive: state.watcherTimers.has(ownProps.watcherId)
});

const mapDispatch = (dispatch: Dispatch<WatcherAction>): Handlers => ({
  onDelete: (id: string) => dispatch(deleteWatcher(id)),
  onCancel: (id: string) => dispatch(cancelNextWatcherTick(id)),
  onSchedule: (id: string) => dispatch(scheduleWatcher(id)),
  onEdit: (id: string, field: EditableWatcherField, value: Primitive) =>
    dispatch(editWatcher(id, field, value))
});

export default connect(mapState, mapDispatch)(WatcherView);
