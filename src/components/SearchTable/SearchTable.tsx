import * as React from 'react';
import { connect } from 'react-redux';
import { ResourceList, Card } from '@shopify/polaris';
import { RootState } from '../../types';
import SearchCard from '../SearchCard/SearchCard';
import SearchTableHeading from './SearchTableHeading';
import SearchTableButtons from './SearchTableButtons';
import EmptySearchTable from './EmptySearchTable';
import { List } from 'immutable';
import { filteredResultsGroupId } from '../../selectors/searchTable';

export interface Props {
  readonly resultsIds: List<string>;
}

class SearchTable extends React.Component<Props, never> {
  shouldComponentUpdate(nextProps: Props) {
    return !this.props.resultsIds.equals(nextProps.resultsIds);
  }

  public render() {
    const { resultsIds } = this.props;
    const numResults = resultsIds.size;

    return numResults === 0 ? (
      <EmptySearchTable />
    ) : (
      <Card>
        <SearchTableHeading displayedResultsSize={numResults} />
        <SearchTableButtons />
        <ResourceList
          items={resultsIds.toArray()}
          renderItem={(id: string) => <SearchCard key={id} groupId={id} />}
        />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  resultsIds: filteredResultsGroupId(state)
});

export default connect(mapState)(SearchTable);
