import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { List } from 'immutable';
import { ResourceList } from '@shopify/polaris';
import { hitsOnSelectedDateIds } from '../../selectors/hitDatabase';
import CompletedHitItem from './CompletedHitItem';

export interface Props {
  readonly hitsOnSelectedDate: List<string>;
}

class CompletedHitList extends React.PureComponent<Props, never> {
  public render() {
    return (
      <ResourceList
        items={this.props.hitsOnSelectedDate.toArray()}
        renderItem={(id: string) => <CompletedHitItem id={id} />}
      />
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitsOnSelectedDate: hitsOnSelectedDateIds(state)
});

export default connect(mapState)(CompletedHitList);
