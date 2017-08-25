import { connect, Dispatch } from 'react-redux';
import App, { Props, Handlers } from '../components/App';
import { RootState, SearchOptions } from '../types';
import { ChangeTab, changeTab } from '../actions/tab';
import { SearchAction, searchRequest } from '../actions/search';

type AppAction = SearchAction | ChangeTab;

const mapState = (state: RootState): Props => ({
  selected: state.tab
});

const mapDispatch = (dispatch: Dispatch<AppAction>): Handlers => ({
  onSelectTab: (selectedTabIndex: number) => {
    dispatch(changeTab(selectedTabIndex));
  },
  onFetch: (options: SearchOptions) => dispatch(searchRequest(options))
});

export default connect(mapState, mapDispatch)(App);
