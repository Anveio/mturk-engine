import * as React from 'react';
import { ResourceList, Card } from '@shopify/polaris';
import SearchCard from '../../containers/SearchCard';
import SortingForm from '../../containers/SortingForm';
import EmptySearchTable from './EmptySearchTable';

export interface Props {
  readonly resultsIds: string[];
}

class SearchTable extends React.PureComponent<Props, never> {
  public render() {
    const { resultsIds } = this.props;
    return resultsIds.length === 0 ? (
      <EmptySearchTable />
    ) : (
      <Card>
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
