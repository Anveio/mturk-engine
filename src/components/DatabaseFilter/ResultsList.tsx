import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, HitId, FilterOrderType } from 'types';
import { ResourceList } from '@shopify/polaris';
import { DATABASE_FILTER_RESULTS_PER_PAGE } from 'constants/misc';
import CompletedHitItem from '../SelectedHitDate/CompletedHitItem';
import DatabaseFilterControl from './DatabaseFilterControl';
import { Iterable } from 'immutable';
import { databaseFilterSortOptions } from 'utils/databaseFilter';
import { changeFilterSortOrder } from 'actions/databaseFilterSettings';

interface Props {
  readonly sortValue: FilterOrderType;
}

interface Handlers {
  readonly onSortChange: (option: FilterOrderType) => void;
}

interface OwnProps {
  readonly page: number;
  readonly hitIds: Iterable<HitId, HitId>;
}

class ResultsList extends React.Component<Props & OwnProps & Handlers, never> {
  shouldComponentUpdate(nextProps: Props & OwnProps) {
    return nextProps.page !== this.props.page || !nextProps.hitIds.equals(this.props.hitIds);
  }

  public render() {
    const { hitIds, page } = this.props;
    const start = DATABASE_FILTER_RESULTS_PER_PAGE * page;
    const end = start + DATABASE_FILTER_RESULTS_PER_PAGE;
    const itemsToShow = hitIds.slice(start, end).toArray();
    // tslint:disable
    return (
      <ResourceList
        showHeader
        filterControl={<DatabaseFilterControl />}
        sortValue={this.props.sortValue}
        sortOptions={databaseFilterSortOptions}
        onSortChange={this.props.onSortChange}
        resourceName={{ singular: 'HIT', plural: 'HITs' }}
        items={itemsToShow}
        renderItem={(id: string) => <CompletedHitItem id={id} />}
      />
    );
  }
}

const mapState = (state: RootState): Props => ({
  sortValue: state.databaseFilterSettings.sortOrder
});

const mapDispatch: Handlers = {
  onSortChange: changeFilterSortOrder
};

export default connect(mapState, mapDispatch)(ResultsList);
