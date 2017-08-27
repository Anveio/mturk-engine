import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Caption } from '@shopify/polaris';

interface Props {
  readonly timeLastSearch: Date;
}

const mapState = (state: RootState): Props => ({
  timeLastSearch: state.timeLastSearch
});

const TimeLastSearch = ({ timeLastSearch }: Props) => {
  return <Caption>Last Search: {timeLastSearch.toLocaleTimeString()}</Caption>;
};

export default connect(mapState)(TimeLastSearch);
