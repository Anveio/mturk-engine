import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { changeTab, ChangeTab } from '../actions/tab';
import TabNavigation, {
  Props,
  Handlers
} from '../components/TabNavigation/TabNavigation';

const mapState = (state: RootState): Props => ({
  selected: state.tab,
  searchSize: state.search.size,
  queueSize: state.queue.size
});

const mapDispatch = (dispatch: Dispatch<ChangeTab>): Handlers => ({
  onSelectTab: (selectedTabIndex: number) => {
    dispatch(changeTab(selectedTabIndex));
  }
});

export default connect(mapState, mapDispatch)(TabNavigation);
