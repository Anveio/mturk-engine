import { connect, Dispatch } from 'react-redux';
import SearchCard, {
  OwnProps,
  Props,
  Handlers
} from '../components/Watchers/WatcherCard';
import { RootState } from '../types';
import {
  DeleteWatcher,
  ToggleWatcherActivity,
  toggleWatcherActive,
  deleteWatcher
} from '../actions/watcher';

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  watcher: state.watchers.get(ownProps.watcherId)
});

export type WatcherAction = ToggleWatcherActivity | DeleteWatcher;

const mapDispatch = (dispatch: Dispatch<DeleteWatcher>): Handlers => ({
  onDelete: (id: string) => {
    dispatch(deleteWatcher(id));
  },
  onToggle: (id: string) => {
    dispatch(toggleWatcherActive(id));
  }
});

export default connect(mapState, mapDispatch)(SearchCard);
