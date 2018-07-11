import * as React from 'react';
import { connect } from 'react-redux';
import { ResourceList, Card } from '@shopify/polaris';
import { RootState, GroupId } from '../../types';
import SearchCard from '../SearchCard/SearchCard';
import SearchTableHeading from './SearchTableHeading';
import EmptySearchTable from './EmptySearchTable';

import { List } from 'immutable';
import { filteredResultsGroupIdList } from '../../selectors/search';

interface Props {
  readonly rawResultsSize: number;
  readonly resultsIds: List<GroupId>;
}

class SearchTable extends React.Component<Props, never> {
  shouldComponentUpdate(nextProps: Props) {
    return !this.props.resultsIds.equals(nextProps.resultsIds);
  }

  public render() {
    const { resultsIds, rawResultsSize } = this.props;
    return rawResultsSize === 0 ? (
      <Card.Section>
        <EmptySearchTable />
      </Card.Section>
    ) : (
      <>
        <Card.Section>
          <SearchTableHeading displayedResultsSize={resultsIds.size} />
        </Card.Section>
        <ResourceList
          items={resultsIds.toArray()}
          renderItem={(id: string) => <SearchCard key={id} groupId={id} />}
        />
      </>
    );
  }
}

const mapState = (state: RootState): Props => ({
  resultsIds: filteredResultsGroupIdList(state),
  rawResultsSize: state.search.size
});

export default connect(mapState)(SearchTable);
