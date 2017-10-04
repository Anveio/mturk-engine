import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { List } from 'immutable';
import { ResourceList } from '@shopify/polaris';
import { NonIdealState } from '@blueprintjs/core';
import { hitsOnSelectedDateIds } from '../../selectors/hitDatabaseDay';
import CompletedHitItem from './CompletedHitItem';

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
      <NonIdealState
        title="No activity recorded for this day."
        description=""
        visual="pt-icon-th-list"
      />
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitsOnSelectedDate: hitsOnSelectedDateIds(state)
});

export default connect(mapState)(CompletedHitList);
