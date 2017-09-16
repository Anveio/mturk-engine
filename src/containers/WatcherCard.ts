import { connect, Dispatch } from 'react-redux';
import SearchCard, {
  OwnProps,
  Props,
  Handlers
} from '../components/Watchers/WatcherCard';
import { RootState, Watcher } from '../types';
import {
  DeleteWatcher,
  ToggleWatcherActivity,
  toggleWatcherActive,
  deleteWatcher
} from '../actions/watcher';
import { WatcherEdit, editWatcher } from '../actions/editWatcher';

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  watcher: state.watchers.get(ownProps.watcherId)
});

type WatcherCardAction = ToggleWatcherActivity | DeleteWatcher | WatcherEdit;

const mapDispatch = (dispatch: Dispatch<WatcherCardAction>): Handlers => ({
  onDelete: (id: string) => {
    dispatch(deleteWatcher(id));
  },
  onToggle: (id: string, active: boolean) => {
    dispatch(toggleWatcherActive(id, active));
  },
  onEdit: (id: string, field: keyof Watcher, value: string | number) => {
    dispatch(editWatcher(id, field, value));
  }
});

export default connect(mapState, mapDispatch)(SearchCard);
