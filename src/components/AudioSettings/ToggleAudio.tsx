import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../types';
import { ToggleAudioEnabled, toggleAudioEnabled } from '../../actions/audio';
import { SettingToggle, TextStyle } from '@shopify/polaris';

interface Props {
  readonly value: boolean;
}

interface Handlers {
  readonly onChange: (value: boolean) => void;
}

class ToggleAudio extends React.PureComponent<Props & Handlers> {
  private static calculateButtonContent = (active: boolean) =>
    active ? 'Disable' : 'Enable';

  private static calculateBodyContent = (active: boolean) =>
    active ? '' : <TextStyle variation="strong">not</TextStyle>;

  public render() {
    const { value, onChange } = this.props;

    return (
      <SettingToggle
        action={{
          content: ToggleAudio.calculateButtonContent(value),
          onAction: () => onChange(!value)
        }}
        enabled={value}
      >
        Audio is {ToggleAudio.calculateBodyContent(value)} enabled.
      </SettingToggle>
    );
  }
}

const mapState = (state: RootState): Props => ({
  value: state.audioSettingsV1.enabled
});

const mapDispatch = (dispatch: Dispatch<ToggleAudioEnabled>): Handlers => ({
  onChange: (value: boolean) => {
    dispatch(toggleAudioEnabled());
  }
});

export default connect(mapState, mapDispatch)(ToggleAudio);
