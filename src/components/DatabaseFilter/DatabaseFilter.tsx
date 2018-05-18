import * as React from 'react';
import { Card, ResourceList, Pagination } from '@shopify/polaris';
import { connect } from 'react-redux';
import { RootState, HitId } from 'types';
import CompletedHitItem from '../SelectedHitDate/CompletedHitItem';
import { hitDatabaseFilteredBySearchTerm } from 'selectors/databaseFilterSettings';
import { changeSearchTerm } from 'actions/databaseFilterSettings';

interface Props {
  readonly hitIds: HitId[];
  readonly searchTerm: string;
}

interface Handlers {
  readonly onSearchChange: (value: string) => void;
}

// tslint:disable:no-console

class DatabaseFilter extends React.Component<Props & Handlers, never> {
  public render() {
    return (
      <Card title="Search your HIT database">
        <ResourceList
          showHeader
          filterControl={
            <ResourceList.FilterControl
              searchValue={this.props.searchTerm}
              onSearchChange={this.props.onSearchChange}
              appliedFilters={[]}
              additionalAction={{
                content: 'Save',
                onAction: () => console.log('Todo: handle save filters.')
              }}
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
  hitIds: hitDatabaseFilteredBySearchTerm(state).toArray()
});

const mapDispatch: Handlers = {
  onSearchChange: changeSearchTerm
};

export default connect(mapState, mapDispatch)(DatabaseFilter);
