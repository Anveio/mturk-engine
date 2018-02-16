import * as React from 'react';
import { connect } from 'react-redux';
import { ResourceList, Card } from '@shopify/polaris';
import { RootState } from '../../types';
import SearchCard from '../SearchCard/SearchCard';
import SearchTableHeading from './SearchTableHeading';
import SearchTableButtons from './SearchTableButtons';
import EmptySearchTable from './EmptySearchTable';
import NewResultAudioLayer from './NewResultAudioLayer';
import NewResultNotificationLayer from './NewResultNotificationLayer';
import { List } from 'immutable';
import { filteredResultsGroupId } from '../../selectors/search';

export interface Props {
  readonly resultsIds: List<string>;
}

class SearchTable extends React.Component<Props, never> {
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
        <NewResultAudioLayer>
          <NewResultNotificationLayer>
            <ResourceList
              items={resultsIds.toArray()}
              renderItem={(id: string) => <SearchCard key={id} groupId={id} />}
            />
          </NewResultNotificationLayer>
        </NewResultAudioLayer>
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  resultsIds: filteredResultsGroupId(state)
});

export default connect(mapState)(SearchTable);
