import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { changeVolume } from '../../actions/audio';
import { Slider } from '@blueprintjs/core';
import { Stack } from '@shopify/polaris';

interface Props {
  readonly value: string;
  readonly enabled: boolean;
}

interface Handlers {
  readonly onChange: (value: number) => void;
}

class EditVolume extends React.PureComponent<Props & Handlers, never> {
  private handleChange = (value: number) => this.props.onChange(value);

  public render() {
    return (
      <Stack vertical spacing="loose">
        <Slider
          disabled={!this.props.enabled}
          value={+this.props.value}
          max={1}
          min={0}
          onChange={this.handleChange}
          stepSize={0.01}
        />
      </Stack>
    );
  }
}

const mapDispatch: Handlers = {
  onChange: changeVolume
};

const mapState = (state: RootState): Props => ({
  value: state.audioSettingsV1.volume.toString(),
  enabled: state.audioSettingsV1.enabled
});

export default connect(mapState, mapDispatch)(EditVolume);
