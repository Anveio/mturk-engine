import * as React from 'react';
import { ResourceList, Card } from '@shopify/polaris';
import SearchCard from '../../containers/SearchCard';
import SortingForm from '../../containers/SortingForm';
import EmptySearchTable from './EmptySearchTable';
import { List } from 'immutable';

export interface Props {
  readonly resultsIds: List<string>;
  readonly rawResultsSize: number;
}

class SearchTable extends React.PureComponent<Props, never> {
  // shouldComponentUpdate(nextProps: Props) {
  //   return !this.props.resultsIds.
  // }

  public render() {
    const { resultsIds, rawResultsSize } = this.props;
    const numResults = resultsIds.size;
    const numHiddenResults = rawResultsSize - resultsIds.size;

    return numResults === 0 ? (
      <EmptySearchTable />
    ) : (
      <Card
        title={`Showing ${numResults} results. (${numHiddenResults} hidden)`}
      >
        <SortingForm />
        <ResourceList
          items={resultsIds.toArray()}
          renderItem={(id: string) => {
            return <SearchCard key={id} groupId={id} />;
          }}
        />
      </Card>
    );
  }
}

export default SearchTable;
