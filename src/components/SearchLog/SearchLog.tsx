import { ResourceList } from '@shopify/polaris';
import { List } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { GroupId, RootState, SearchResult } from '../../types';
import SearchCard from '../SearchCard/SearchCard';

interface Props {
  readonly rawResultsSize: number;
  readonly resultsIds: List<GroupId>;
}

class SearchLog extends React.Component<Props, never> {
  shouldComponentUpdate(nextProps: Props) {
    return !this.props.resultsIds.equals(nextProps.resultsIds);
  }

  public render() {
    const { resultsIds, rawResultsSize } = this.props;
    return rawResultsSize === 0 ? (
      <ResourceList
        items={resultsIds.toArray()}
        renderItem={(id: string) => <SearchCard key={id} groupId={id} />}
      />
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  rawResultsSize: state.searchResultsLog.size,
  resultsIds: state.searchResultsLog
    .map((el: SearchResult) => el.groupId)
    .toList()
});

export default connect(mapState)(SearchLog);
