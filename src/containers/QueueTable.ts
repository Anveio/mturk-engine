import { connect } from 'react-redux';
import { RootState } from '../types';
import HitTable, { Props } from '../components/Queue/QueueTable';

const mapState = (state: RootState): Props => ({
  queue: state.queue
});

export default connect(mapState)(HitTable);
