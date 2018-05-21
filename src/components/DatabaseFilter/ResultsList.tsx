import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, HitId } from 'types';
import { ResourceList } from '@shopify/polaris';
import { DATABASE_FILTER_RESULTS_PER_PAGE } from 'constants/misc';
import CompletedHitItem from '../SelectedHitDate/CompletedHitItem';
import { hitDatabaseFilteredBySearchTerm } from 'selectors/databaseFilterSettings';
import DatabaseFilterControl from './DatabaseFilterControl';
import { Iterable } from 'immutable';

interface Props {
  readonly hitIds: Iterable<HitId, HitId>;
}

interface OwnProps {
  readonly page: number;
}

class ResultsList extends React.Component<Props & OwnProps, never> {
  shouldComponentUpdate(nextProps: Props) {
    return !nextProps.hitIds.equals(this.props.hitIds);
  }

  public render() {
    const { hitIds, page } = this.props;
    const start = DATABASE_FILTER_RESULTS_PER_PAGE * page;
    const end = start + DATABASE_FILTER_RESULTS_PER_PAGE;
    const itemsToShow = hitIds.slice(start, end).toArray();

    return (
      <ResourceList
        showHeader
        filterControl={<DatabaseFilterControl />}
        resourceName={{ singular: 'HIT', plural: 'HITs' }}
        items={itemsToShow}
        renderItem={(id: string) => <CompletedHitItem id={id} />}
      />
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitIds: hitDatabaseFilteredBySearchTerm(state)
});

export default connect(mapState)(ResultsList);
