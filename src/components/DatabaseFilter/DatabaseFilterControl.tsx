import * as React from 'react';
import { ResourceList } from '@shopify/polaris';
import { StatusFilterType, RootState } from 'types';
import {
  availableFilters,
  statusFiltersToAppliedFilterArray,
  AppliedHitDatabaseFilter,
  appliedFiltersToStatusFilterTypeArray
} from 'utils/databaseFilter';
import { connect } from 'react-redux';
import {
  changeSearchTerm,
  changeFilters
} from 'actions/databaseFilterSettings';

interface Props {
  readonly searchTerm: string;
  readonly statusFilters: StatusFilterType[];
}

interface Handlers {
  readonly onSearchChange: (value: string) => void;
  readonly onFilterChange: (filters: StatusFilterType[]) => void;
}

class DatabaseFilterControl extends React.Component<Props & Handlers, never> {
  private handleFilterChange = (filters: AppliedHitDatabaseFilter[]) => {
    const newFilters = appliedFiltersToStatusFilterTypeArray(filters);
    this.props.onFilterChange(newFilters);
  };

  private clearAllFields = () => {
    this.props.onSearchChange('');
    this.props.onFilterChange([]);
  };

  public render() {
    const filters = statusFiltersToAppliedFilterArray(this.props.statusFilters);

    return (
      <ResourceList.FilterControl
        additionalAction={{
          content: 'Clear',
          onAction: this.clearAllFields
        }}
        searchValue={this.props.searchTerm}
        onSearchChange={this.props.onSearchChange}
        filters={availableFilters}
        appliedFilters={filters}
        onFiltersChange={this.handleFilterChange}
      />
    );
  }
}

const mapState = (state: RootState): Props => ({
  searchTerm: state.databaseFilterSettings.searchTerm,
  statusFilters: state.databaseFilterSettings.statusFilters
});

const mapDispatch: Handlers = {
  onSearchChange: changeSearchTerm,
  onFilterChange: changeFilters
};

export default connect(mapState, mapDispatch)(DatabaseFilterControl);
