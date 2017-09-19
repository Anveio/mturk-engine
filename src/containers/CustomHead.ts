import { connect } from 'react-redux';
import { RootState } from '../types';
import CustomHead, { Props } from '../components/CustomHead';
import { newResults } from '../selectors/searchTable';

const mapState = (state: RootState): Props => ({
  numNewHits: newResults(state).size,
  queueSize: state.queue.size
});

export default connect(mapState)(CustomHead);
