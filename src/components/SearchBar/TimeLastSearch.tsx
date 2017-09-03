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

const TimeLastSearch = ({ timeLastSearch }: Props) => {
  return timeLastSearch ? (
    <Caption>Last Search: {timeLastSearch.toLocaleTimeString()}</Caption>
  ) : (
    <div />
  );
};

export default connect(mapState)(TimeLastSearch);
