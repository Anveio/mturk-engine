import { connect, Dispatch } from 'react-redux';
import App, { Props, Handlers } from '../components/App';
import { RootState } from '../types';
import { ChangeTab, changeTab } from '../actions/tab';

const mapState = (state: RootState): Props => ({
  selected: state.tab
});

const mapDispatch = (dispatch: Dispatch<ChangeTab>): Handlers => ({
  onSelectTab: (selectedTabIndex: number) => {
    dispatch(changeTab(selectedTabIndex));
  }
});

export default connect(mapState, mapDispatch)(App);
