import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, HitDatabaseMap, HitDatabaseEntry } from '../../types';
import { Card } from '@shopify/polaris';

export interface Props {
  readonly data: HitDatabaseMap;
}

class DataChart extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Card>
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
  data: state.hitDatabase
});

export default connect(mapState)(DataChart);
