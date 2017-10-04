import * as React from 'react';
import { Card } from '@shopify/polaris';
import CompletedHitList from './CompletedHitList';
import DateDisplay from './DateDisplay';
import ActionBar from './ActionBar';

class SelectedHitDate extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Card>
        <DateDisplay />
        <ActionBar />
        <CompletedHitList />
      </Card>
    );
  }
}

export default SelectedHitDate;
