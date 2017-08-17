import { connect } from 'react-redux';
import { RootState } from '../types';
import QueueTable, { Props } from '../components/Queue/QueueTable';

const mapState = (state: RootState): Props => ({
  queue: state.queue
});

export default connect(mapState)(QueueTable);
