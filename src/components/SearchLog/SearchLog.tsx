import * as React from 'react';
import { Card, Layout } from '@shopify/polaris';
import { connect } from 'react-redux';
import { RootState, HitId } from 'types';
import {
  filteredResultsIds,
  databaseFilterResultsMoneyTotal
} from 'selectors/databaseFilterSettings';
import { Iterable } from 'immutable';

interface Props {
  readonly hitIds: Iterable<HitId, HitId>;
  readonly resultsMoneyTotal: number;
}

class SearchLog extends React.Component<Props, never> {
  public render() {
    return (
      <Layout>
        <Layout.Section>
          <Card />
        </Layout.Section>
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitIds: filteredResultsIds(state),
  resultsMoneyTotal: databaseFilterResultsMoneyTotal(state)
});

export default connect(mapState)(SearchLog);
