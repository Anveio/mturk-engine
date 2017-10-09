import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../types';
import { List } from 'immutable';
import { ResourceList } from '@shopify/polaris';
import { hitsOnSelectedDateIds } from '../../../selectors/hitDatabaseDay';
import CompletedHitItem from './CompletedHitItem';
import NoActivity from './NoActivity';

export interface Props {
  readonly hitsOnSelectedDate: List<string>;
}

class CompletedHitList extends React.PureComponent<Props, never> {
  public render() {
    return this.props.hitsOnSelectedDate.size > 0 ? (
      <ResourceList
        items={this.props.hitsOnSelectedDate.toArray()}
        renderItem={(id: string) => <CompletedHitItem id={id} />}
      />
    ) : (
      <NoActivity />
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitsOnSelectedDate: hitsOnSelectedDateIds(state)
});

export default connect(mapState)(CompletedHitList);
