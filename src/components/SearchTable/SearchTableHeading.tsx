import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Card, Heading } from '@shopify/polaris';
import { resultsLengthSelector, newResults } from '../../selectors/searchTable';

export interface Props {
  readonly rawResultsSize: number;
  readonly numNewHits: number;
}

export interface OwnProps {
  readonly displayedResultsSize: number;
}

class SearchTableHeading extends React.PureComponent<Props & OwnProps, never> {
  static showNewResults = (numNew: number) =>
    numNew > 0 ? `${numNew} new, ` : '';

  public render() {
    const { displayedResultsSize, numNewHits, rawResultsSize } = this.props;
    const numHiddenResults = rawResultsSize - displayedResultsSize;

    return (
      <Card.Section>
        <Heading>
          Showing {displayedResultsSize} results. ({SearchTableHeading.showNewResults(numNewHits)}
          {numHiddenResults} hidden)
        </Heading>
      </Card.Section>
    );
  }
}

const mapState = (state: RootState): Props => ({
  rawResultsSize: resultsLengthSelector(state),
  numNewHits: newResults(state).size
});

export default connect(mapState)(SearchTableHeading);
