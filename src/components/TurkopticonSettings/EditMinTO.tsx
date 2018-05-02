import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, TOpticonSettings } from '../../types';
import { FormUpdate, updateForm } from '../../actions/form';
import { Slider, Classes } from '@blueprintjs/core';
import { Stack } from '@shopify/polaris';

interface Props {
  readonly value: string;
  readonly enabled: boolean;
}

interface Handlers {
  readonly onChange: (value: string) => void;
}

const mapDispatch = (
  dispatch: Dispatch<FormUpdate<TOpticonSettings>>
): Handlers => ({
  onChange: (value: string) => {
    dispatch(
      updateForm<TOpticonSettings>(
        'topticonSettings',
        'minimumWeightedTO',
        +value
      )
    );
  }
});

const mapState = (state: RootState): Props => ({
  value: state.topticonSettings.minimumWeightedTO.toString(),
  enabled: state.topticonSettings.hideBelowThresholdEnabled
});

class EditMinTO extends React.PureComponent<Props & Handlers, never> {
  private static generateHelpText = (active: boolean) =>
    active
      ? 'Requesters with weighted average scores below this number will not have their HITs shown.'
      : 'The value of this field is not affecting your results.';

  private handleChange = (value: number) =>
    this.props.onChange(value.toFixed(2));

  public render() {
    return (
      <Stack vertical spacing="loose">
        <Slider
          disabled={!this.props.enabled}
          value={+this.props.value}
          max={5}
          min={0}
          onChange={this.handleChange}
          stepSize={0.05}
        />
        <label className={`${Classes.LABEL}`}>
          <span className={`${Classes.TEXT_MUTED}`}>
            {EditMinTO.generateHelpText(this.props.enabled)}
          </span>
        </label>
      </Stack>
    );
  }
}

export default connect(mapState, mapDispatch)(EditMinTO);
