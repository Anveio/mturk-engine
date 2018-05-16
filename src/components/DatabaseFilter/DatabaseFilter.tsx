import * as React from 'react';
import { Card, ResourceList } from '@shopify/polaris';
import { connect } from 'react-redux';
import { RootState, HitId } from 'types';
import { hitsOnSelectedDateIds } from 'selectors/hitDatabaseDay';
import CompletedHitItem from '../SelectedHitDate/CompletedHitItem';

interface Props {
  readonly hitIds: HitId[];
}

interface State {
  readonly searchTerm: string;
}

// tslint:disable:no-console

class DatabaseFilter extends React.PureComponent<Props, State> {
  public readonly state: State = {
    searchTerm: 'USA'
  };

  public render() {
    return (
      <Card title="Search your HIT database">
        <ResourceList
          showHeader
          filterControl={
            <ResourceList.FilterControl
              searchValue={this.state.searchTerm}
              onSearchChange={searchValue => {
                console.log(
                  `Search value changed to ${searchValue}.`,
                  'Todo: use setState to apply this change.'
                );
              }}
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
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitIds: hitsOnSelectedDateIds(state).toArray()
});

export default connect(mapState)(DatabaseFilter);
