import * as React from 'react';
import {
  SearchResult,
  SearchResults,
  HitBlockMap,
  RequesterBlockMap,
  SortingOption
} from '../../types';
import { ResourceList, Card } from '@shopify/polaris';
import SearchCard from '../../containers/SearchCard';
import SortingForm from '../../containers/SortingForm';
import EmptySearchTable from './EmptySearchTable';
import { sortBy } from '../../utils/sorting';

export interface Props {
  readonly hits: SearchResults;
  readonly sortingOption: SortingOption;
  readonly blockedHits: HitBlockMap;
  readonly blockedRequesters: RequesterBlockMap;
}

class SearchTable extends React.PureComponent<Props, never> {
  private hideBlockedHits = (hit: SearchResult) =>
    !this.props.blockedHits.get(hit.groupId);

  private hideBlockedRequesters = (hit: SearchResult) =>
    !this.props.blockedRequesters.get(hit.requester.id);

  public render() {
    const { hits, sortingOption } = this.props;

    const displayedHits = this.props.hits
      .filter(this.hideBlockedRequesters)
      .filter(this.hideBlockedHits)
      .toList()
      .sort(sortBy(sortingOption));

    return hits.isEmpty() ? (
      <EmptySearchTable />
    ) : (
      <Card
        title={`${hits.size} results. ${hits.size -
          displayedHits.size} hidden.`}
      >
        <SortingForm />
        <ResourceList
          items={displayedHits.toArray()}
          renderItem={(hit: SearchResult) => {
            return <SearchCard key={hit.groupId} groupId={hit.groupId} />;
          }}
        />
      </Card>
    );
  }
}

export default SearchTable;
