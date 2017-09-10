import * as React from 'react';
import { ResourceList, Card } from '@shopify/polaris';
import SearchCard from '../../containers/SearchCard';
import SortingForm from '../../containers/SortingForm';
import EmptySearchTable from './EmptySearchTable';

export interface Props {
  readonly resultsIds: string[];
  readonly rawResultsSize: number;
}

class SearchTable extends React.PureComponent<Props, never> {
  public render() {
    const { resultsIds, rawResultsSize } = this.props;
    const numResults = resultsIds.length;
    const numHiddenResults = rawResultsSize - resultsIds.length;

    return numResults === 0 ? (
      <EmptySearchTable />
    ) : (
      <Card
        title={`Showing ${numResults} results. (${numHiddenResults} hidden)`}
      >
        <SortingForm />
        <ResourceList
          items={resultsIds}
          renderItem={(id: string) => {
            return <SearchCard key={id} groupId={id} />;
          }}
        />
      </Card>
    );
  }
}

export default SearchTable;
