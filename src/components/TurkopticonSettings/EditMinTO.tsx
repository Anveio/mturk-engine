import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, TOpticonSettings } from '../../types';
import { FormAction, updateForm } from '../../actions/form';
import { TextField } from '@shopify/polaris';

interface Props {
  readonly value: string;
  readonly enabled: boolean;
}

interface Handlers {
  readonly onChange: (value: string) => void;
}

const mapDispatch = (
  dispatch: Dispatch<FormAction<TOpticonSettings>>
): Handlers => ({
  onChange: (value: string) => {
    dispatch(
      updateForm<TOpticonSettings>(
        'topticonSettings',
        'minimumWeightedTO',
        value
      )
    );
  }
});

const mapState = (state: RootState): Props => ({
  value: state.topticonSettings.minimumWeightedTO.toString(),
  enabled: state.topticonSettings.hideBelowThresholdEnabled
});

class EditMinTO extends React.PureComponent<Props & Handlers, never> {
  static generateHelpText = (active: boolean) =>
    active
      ? 'Requesters with scores below this number will not have their HITs shown.'
      : 'Enable this setting to edit this field.';

  public render() {
    return (
      <TextField
        disabled={!this.props.enabled}
        label="Minimum T.O"
        helpText={EditMinTO.generateHelpText(this.props.enabled)}
        type="number"
        step={0.1}
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default connect(mapState, mapDispatch)(EditMinTO);
