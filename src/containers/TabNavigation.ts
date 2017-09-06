import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { changeTab, ChangeTab } from '../actions/tab';
import TabNavigation, {
  Props,
  Handlers
} from '../components/TabNavigation/TabNavigation';

const mapState = (state: RootState): Props => ({
  selected: state.tab,
  queueSize: state.queue.size
});

const mapDispatch = (dispatch: Dispatch<ChangeTab>): Handlers => ({
  onSelectTab: (selectedTabIndex: number) => {
    dispatch(changeTab(selectedTabIndex));
    window.setTimeout(() => scrollTo(0, 0));
  }
});

export default connect(mapState, mapDispatch)(TabNavigation);
