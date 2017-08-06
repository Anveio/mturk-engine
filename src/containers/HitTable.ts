import { connect } from 'react-redux';
import HitTable, { Props } from '../components/HitTable/HitTable';

const mapState = (state: RootState): Props => ({
  data: state.data
});

export default connect(mapState)(HitTable);
