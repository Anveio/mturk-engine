import * as React from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from '@blueprintjs/core';
// import { Card, Stack, DisplayText } from '@shopify/polaris';
import { RootState } from '../../types';
import { todaysProjectedEarnings } from '../../selectors/hitDatabase';

export interface Props {
  readonly dailyEarningsGoal: number;
  readonly todaysEarnings: number;
}

class DailyEarningsProgressBar extends React.PureComponent<Props, never> {
  private static calculateProgress = (value: number, goal: number) => value / goal;

  public render() {
    const { dailyEarningsGoal, todaysEarnings } = this.props;
    return (
      <ProgressBar
        className="pt-no-stripes pt-no-animation"
        value={DailyEarningsProgressBar.calculateProgress(
          todaysEarnings,
          dailyEarningsGoal
        )}
        intent={1}
      />
    );
  }
}

const mapState = (state: RootState): Props => ({
  dailyEarningsGoal: state.dailyEarningsGoal,
  todaysEarnings: todaysProjectedEarnings(state)
});

export default connect(mapState)(DailyEarningsProgressBar);
