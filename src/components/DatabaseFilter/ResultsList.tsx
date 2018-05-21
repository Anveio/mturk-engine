import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, HitId, StatusFilterType } from 'types';
import { ResourceList } from '@shopify/polaris';
import { RESULTS_PER_PAGE } from 'constants/misc';
import CompletedHitItem from '../SelectedHitDate/CompletedHitItem';
import {
  statusFiltersToAppliedFilterArray,
  availableFilters,
  appliedFiltersToStatusFilterTypeSet,
  AppliedHitDatabaseFilter
} from 'utils/databaseFilter';
import { Set } from 'immutable';
import { hitDatabaseFilteredBySearchTerm } from 'selectors/databaseFilterSettings';
import {
  changeSearchTerm,
  changeFilters
} from 'actions/databaseFilterSettings';

interface Props {
  readonly searchTerm: string;
  readonly statusFilters: Set<StatusFilterType>;
  readonly hitIds: HitId[];
}

interface Handlers {
  readonly onSearchChange: (value: string) => void;
  readonly onFilterChange: (filters: Set<StatusFilterType>) => void;
}

interface OwnProps {
  readonly page: number;
}

class ResultsList extends React.Component<Props & OwnProps & Handlers, never> {
  private handleFilterChange = (filters: AppliedHitDatabaseFilter[]) => {
    const newFilters = appliedFiltersToStatusFilterTypeSet(filters);
    this.props.onFilterChange(newFilters);
  };

  public render() {
    const { hitIds, page } = this.props;
    const start = RESULTS_PER_PAGE * page;
    const end = start + RESULTS_PER_PAGE;
    const itemsToShow = hitIds.slice(start, end);
    const filters = statusFiltersToAppliedFilterArray(this.props.statusFilters);

    return (
      <ResourceList
        showHeader
        filterControl={
          <ResourceList.FilterControl
            searchValue={this.props.searchTerm}
            onSearchChange={this.props.onSearchChange}
            filters={availableFilters}
            appliedFilters={filters}
            onFiltersChange={this.handleFilterChange}
          />
        }
        resourceName={{ singular: 'HIT', plural: 'HITs' }}
        items={itemsToShow}
        renderItem={(id: string) => <CompletedHitItem id={id} />}
      />
    );
  }
}

const mapState = (state: RootState): Props => ({
  searchTerm: state.databaseFilterSettings.searchTerm,
  statusFilters: state.databaseFilterSettings.statusFilters,
  hitIds: hitDatabaseFilteredBySearchTerm(state).toArray()
});

const mapDispatch: Handlers = {
  onSearchChange: changeSearchTerm,
  onFilterChange: changeFilters
};

export default connect(mapState, mapDispatch)(ResultsList);
