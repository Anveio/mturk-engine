import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { Card } from '@shopify/polaris'
import { RootState } from '../../types';
import { hitsOnSelectedDateIds } from '../../selectors/hitDatabase';

export interface Props {
  readonly selectedDate: Date | null;
  readonly hitsOnSelectedDate: List<string>;
}

class SelectedHitDate extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Card.Section>
        {this.props.hitsOnSelectedDate.map((el) => <p key={el}>{el}</p>)}
      </Card.Section>
    );
  }
}

const mapState = (state: RootState): Props => ({
  selectedDate: state.selectedHitDbDate,
  hitsOnSelectedDate: hitsOnSelectedDateIds(state)
});

export default connect(mapState)(SelectedHitDate);
