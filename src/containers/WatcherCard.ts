import { connect, Dispatch } from 'react-redux';
import SearchCard, {
  OwnProps,
  Props,
  Handlers
} from '../components/Watchers/WatcherCard';
import { RootState } from '../types';
import { DeleteWatcher, deleteWatcher } from '../actions/addWatcher';

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  watcher: state.watchers.get(ownProps.watcherId)
});

const mapDispatch = (dispatch: Dispatch<DeleteWatcher>): Handlers => ({
  onDelete: (id: string) => {
    dispatch(deleteWatcher(id));
  }
});

export default connect(mapState, mapDispatch)(SearchCard);
