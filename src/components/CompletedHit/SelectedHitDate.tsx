import * as React from 'react';
import { Stack } from '@shopify/polaris';
import CompletedHitList from './CompletedHitList';
import DateInfo from './DateInfo';

class SelectedHitDate extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Stack vertical spacing="tight">
        <DateInfo />
        <CompletedHitList />
      </Stack>
    );
  }
}

export default SelectedHitDate;
