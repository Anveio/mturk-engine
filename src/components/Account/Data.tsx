import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, HitDatabaseMap, HitDatabaseEntry } from '../../types';
import { Card } from '@shopify/polaris';
import { pendingEarnings } from '../../selectors/hitDatabase';

export interface Props {
  readonly data: HitDatabaseMap;
  readonly pending: number;
}

class DataChart extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Card title={'$' + this.props.pending.toString()}>
        {this.props.data.map((el: HitDatabaseEntry) => {
          return (
            <Card.Section key={el.id}>
              {el.id}
              {el.title}
              {el.status}
              {el.reward}
              {el.requester.name}
            </Card.Section>
          );
        })}
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  data: state.hitDatabase,
  pending: pendingEarnings(state)
});

export default connect(mapState)(DataChart);
