import * as React from 'react';
import { ResourceList, Card } from '@shopify/polaris';
import SearchCard from '../../containers/SearchCard';
import SearchTableHeading from './SearchTableHeading';
import SearchTableButtons from './SearchTableButtons';
import EmptySearchTable from './EmptySearchTable';
import { List } from 'immutable';

export interface Props {
  readonly resultsIds: List<string>;
}

class SearchTable extends React.PureComponent<Props, never> {
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
          renderItem={(id: string) => {
            return <SearchCard key={id} groupId={id} />;
          }}
        />
      </Card>
    );
  }
}

export default SearchTable;
