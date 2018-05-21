import * as React from 'react';
import { Card, ResourceList, Pagination } from '@shopify/polaris';
import { connect } from 'react-redux';
import { RootState, HitId, StatusFilterType } from 'types';
import CompletedHitItem from '../SelectedHitDate/CompletedHitItem';
import { hitDatabaseFilteredBySearchTerm } from 'selectors/databaseFilterSettings';
import {
  changeSearchTerm,
  changeFilters
} from 'actions/databaseFilterSettings';
import { Set } from 'immutable';
import {
  statusFiltersToAppliedFilterArray,
  availableFilters,
  appliedFiltersToStatusFilterTypeSet,
  AppliedHitDatabaseFilter
} from 'utils/databaseFilter';

interface Props {
  readonly hitIds: HitId[];
  readonly searchTerm: string;
  readonly statusFilters: Set<StatusFilterType>;
}

interface Handlers {
  readonly onSearchChange: (value: string) => void;
  readonly onFilterChange: (filters: Set<StatusFilterType>) => void;
}

// tslint:disable:no-console

class DatabaseFilter extends React.Component<Props & Handlers, never> {
  private handleFilterChange = (filters: AppliedHitDatabaseFilter[]) => {
    console.log(filters);
    const newFilters = appliedFiltersToStatusFilterTypeSet(filters);
    this.props.onFilterChange(newFilters);
  };

  public render() {
    console.log(this.props.statusFilters.toArray());
    const filters = statusFiltersToAppliedFilterArray(this.props.statusFilters);
    return (
      <Card title="Search your HIT database">
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
          items={this.props.hitIds}
          renderItem={(id: string) => <CompletedHitItem id={id} />}
        />
        <Pagination hasNext={this.props.hitIds.length > 20} />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  searchTerm: state.databaseFilterSettings.searchTerm,
  statusFilters: state.databaseFilterSettings.statusFilters,
  hitIds: hitDatabaseFilteredBySearchTerm(state)
    .toArray()
    .slice(0, 10)
});

const mapDispatch: Handlers = {
  onSearchChange: changeSearchTerm,
  onFilterChange: changeFilters
};

export default connect(mapState, mapDispatch)(DatabaseFilter);
