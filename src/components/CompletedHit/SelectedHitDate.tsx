import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Stack, DisplayText } from '@shopify/polaris';
import { RootState } from '../../types';
import { dateStringToLocaleDateString } from '../../utils/dates';
import CompletedHitList from './CompletedHitList';

export interface Props {
  readonly selectedDate: string | null;
}

class SelectedHitDate extends React.PureComponent<Props, never> {
  static generateTitle = (selectedDate: string | null) =>
    selectedDate
      ? `${dateStringToLocaleDateString(selectedDate)}`
      : 'Select a date to see more information.';

  public render() {
    const { selectedDate } = this.props;
    return (
      <Card sectioned>
        <Stack vertical spacing="tight">
          <DisplayText size="small">
            {SelectedHitDate.generateTitle(selectedDate)}
          </DisplayText>
          <CompletedHitList />
        </Stack>
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  selectedDate: state.selectedHitDbDate
});

export default connect(mapState)(SelectedHitDate);
