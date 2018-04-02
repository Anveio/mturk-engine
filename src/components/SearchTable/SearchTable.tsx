import * as React from 'react';
import { connect } from 'react-redux';
import { ResourceList, Card } from '@shopify/polaris';
import { RootState, GroupId } from '../../types';
import SearchCard from '../SearchCard/SearchCard';
import SearchTableHeading from './SearchTableHeading';
import EmptySearchTable from './EmptySearchTable';

import { List } from 'immutable';
import { filteredResultsGroupId } from '../../selectors/search';

interface Props {
  readonly rawResultsSize: number;
  readonly resultsIds: List<GroupId>;
}

class SearchTable extends React.Component<Props, never> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.rawResultsSize !== nextProps.rawResultsSize ||
      !this.props.resultsIds.equals(nextProps.resultsIds)
    );
  }

  public render() {
    const { resultsIds, rawResultsSize } = this.props;
    return rawResultsSize === 0 ? (
      <EmptySearchTable />
    ) : (
      <Card>
        <SearchTableHeading displayedResultsSize={resultsIds.size} />
        <ResourceList
          items={resultsIds.toArray()}
          renderItem={(id: string) => <SearchCard key={id} groupId={id} />}
        />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  resultsIds: filteredResultsGroupId(state),
  rawResultsSize: state.search.size
});

export default connect(mapState)(SearchTable);
