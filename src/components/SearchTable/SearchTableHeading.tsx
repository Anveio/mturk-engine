import * as React from 'react';
import { connect } from 'react-redux'
import { RootState } from '../../types'
import { Card, Heading } from '@shopify/polaris';
import {
  resultsLengthSelector
} from '../../selectors/searchTable';

export interface Props {
  readonly rawResultsSize: number;
}

export interface OwnProps {
  readonly displayedResultsSize: number;
}

class SearchTableHeading extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { displayedResultsSize, rawResultsSize } = this.props;
    const numHiddenResults = rawResultsSize - displayedResultsSize;

    return (
      <Card.Section>
        <Heading>
          Showing {displayedResultsSize} results. ({numHiddenResults} hidden)
        </Heading>
      </Card.Section>
    );
  }
}

const mapState = (state: RootState): Props => ({
  rawResultsSize: resultsLengthSelector(state)
}) 



export default connect(mapState)(SearchTableHeading);
