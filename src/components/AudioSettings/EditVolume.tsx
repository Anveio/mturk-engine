import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../types';
import { ChangeVolume, changeVolume } from '../../actions/audio';
import { Slider } from '@blueprintjs/core';
import { Stack } from '@shopify/polaris';

interface Props {
  readonly value: string;
  readonly enabled: boolean;
}

interface Handlers {
  readonly onChange: (value: string) => void;
}

const mapDispatch = (dispatch: Dispatch<ChangeVolume>): Handlers => ({
  onChange: (value: string) => {
    dispatch(changeVolume(+value));
  }
});

const mapState = (state: RootState): Props => ({
  value: state.audioSettingsV1.volume.toString(),
  enabled: state.audioSettingsV1.enabled
});

class EditVolume extends React.PureComponent<Props & Handlers, never> {
  private handleChange = (value: number) =>
    this.props.onChange(value.toFixed(2));

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

export default connect(mapState, mapDispatch)(EditVolume);
