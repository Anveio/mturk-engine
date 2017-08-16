import { connect, Dispatch } from 'react-redux';
import App, { Props, Handlers } from '../components/App';
import { RootState } from '../types';
import { HitPageAction } from '../actions/hits';
import { ChangeTab, changeTab } from '../actions/tab';
import { TOpticonAction } from '../actions/turkopticon';
import { onFetch } from '../requests/onFetch';

type AppAction = HitPageAction | TOpticonAction | ChangeTab;

const mapState = (state: RootState): Props => ({
  selected: state.tab,
  hits: state.hits,
  requesters: state.requesters,
  options: state.searchOptions
});

const mapDispatch = (dispatch: Dispatch<AppAction>): Handlers => ({
  onSelectTab: (selectedTabIndex: number) => {
    dispatch(changeTab(selectedTabIndex));
  },
  /**
   * Credit to: https://www.bignerdranch.com/blog/cross-stitching-elegant-concurrency-patterns-for-javascript/
   */
  onFetch: onFetch(dispatch)
});

export default connect(mapState, mapDispatch)(App);
