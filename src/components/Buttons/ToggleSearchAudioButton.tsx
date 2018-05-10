import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Tooltip,
  Button,
  Position,
  IconName,
  Classes
} from '@blueprintjs/core';
import { RootState } from 'types';
import { toggleSearchAudio, changeTab } from 'actions/updateValue';
import { TabIndex } from 'constants/enums';

type AudioState = 'GLOBALLY_DISABLED' | 'ENABLED' | 'DISABLED';

interface Props {
  readonly globalAudioEnabled: boolean;
  readonly searchAudioEnabled: boolean;
}

interface Handlers {
  readonly onToggle: () => void;
  readonly onChangeTab: () => void;
}

class ToggleSearchAudioButton extends React.PureComponent<
  Props & Handlers,
  never
> {
  private static calculateAudioState = (
    globalAudioEnabled: boolean,
    searchAudioEnabled: boolean
  ): AudioState => {
    if (!globalAudioEnabled) {
      return 'GLOBALLY_DISABLED';
    }

    return searchAudioEnabled ? 'ENABLED' : 'DISABLED';
  };

  private static generateTooltipContent = (audioState: AudioState) => {
    switch (audioState) {
      case 'GLOBALLY_DISABLED':
        return 'Audio is globally disabled from the settings tab.';
      case 'ENABLED':
        return 'Sound will play for new results.';
      case 'DISABLED':
      default:
        return 'Sound will not play for new results.';
    }
  };

  private static generateButtonIcon = (audioState: AudioState): IconName => {
    switch (audioState) {
      case 'GLOBALLY_DISABLED':
        return 'volume-off';
      case 'ENABLED':
        return 'volume-up';
      case 'DISABLED':
      default:
        return 'volume-off';
    }
  };

  private static audioStateToUiText = (audioState: AudioState) => {
    switch (audioState) {
      case 'GLOBALLY_DISABLED':
        return 'off';
      case 'ENABLED':
        return 'on';
      case 'DISABLED':
      default:
        return 'off';
    }
  };

  private handleClick = (audioState: AudioState) => () => {
    switch (audioState) {
      case 'GLOBALLY_DISABLED':
        this.props.onChangeTab();
        break;
      default:
        this.props.onToggle();
    }
    return;
  };

  public render() {
    const { searchAudioEnabled, globalAudioEnabled } = this.props;
    const {
      calculateAudioState,
      generateTooltipContent,
      generateButtonIcon,
      audioStateToUiText
    } = ToggleSearchAudioButton;

    const audioState = calculateAudioState(
      globalAudioEnabled,
      searchAudioEnabled
    );
    const tooltipContent = generateTooltipContent(audioState);

    return (
      <Tooltip content={tooltipContent} position={Position.TOP}>
        <Button
          aria-label={`Search audio is ${audioStateToUiText(audioState)}`}
          className={Classes.MINIMAL + ' ' + Classes.SMALL}
          icon={generateButtonIcon(audioState)}
          onClick={this.handleClick(audioState)}
        />
      </Tooltip>
    );
  }
}

const mapState = (state: RootState): Props => ({
  globalAudioEnabled: state.audioSettingsV1.enabled,
  searchAudioEnabled: state.searchAudioEnabled
});

const mapDispatch = (dispatch: Dispatch): Handlers => ({
  onToggle: () => dispatch(toggleSearchAudio()),
  onChangeTab: () => dispatch(changeTab(TabIndex.SETTINGS))
});

export default connect(mapState, mapDispatch)(ToggleSearchAudioButton);
