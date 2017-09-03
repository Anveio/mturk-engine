import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Caption } from '@shopify/polaris';

interface Props {
  readonly timeLastSearch: Date | null;
}

const mapState = (state: RootState): Props => ({
  timeLastSearch: state.timeLastSearch
});

class TimeLastSearch extends React.PureComponent<Props, never> {
  public render() {
    const { timeLastSearch } = this.props;
    return timeLastSearch ? (
      <Caption>Last Search: {timeLastSearch.toLocaleTimeString()}</Caption>
    ) : (
      <div />
    );
  }
}

export default connect(mapState)(TimeLastSearch);
