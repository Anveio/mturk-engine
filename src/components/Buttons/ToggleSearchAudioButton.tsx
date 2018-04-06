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
import { ToggleSearchAudio, toggleSearchAudio } from 'actions/updateValue';

interface Props {
  readonly globalAudioEnabled: boolean;
  readonly searchAudioEnabled: boolean;
}

interface Handlers {
  readonly onClick: () => void;
}

class ToggleSearchAudioButton extends React.PureComponent<
  Props & Handlers,
  never
> {
  private static generateTooltipContent = (
    globalAudioEnabled: boolean,
    searchAudioEnabled: boolean
  ) => {
    if (!globalAudioEnabled) {
      return 'Audio is globally disabled from the settings tab.';
    }

    return searchAudioEnabled
      ? 'Sound will play for new results.'
      : 'Sound will not play for new results.';
  };

  private static generateButtonIcon = (
    globalAudioEnabled: boolean,
    searchAudioEnabled: boolean
  ): IconName => {
    if (!globalAudioEnabled) {
      return 'volume-off';
    }

    return searchAudioEnabled ? 'volume-up' : 'volume-off';
  };

  public render() {
    const { searchAudioEnabled, globalAudioEnabled, onClick } = this.props;
    const tooltipContent = ToggleSearchAudioButton.generateTooltipContent(
      globalAudioEnabled,
      searchAudioEnabled
    );
    return (
      <Tooltip content={tooltipContent} position={Position.TOP_LEFT}>
        <Button
          label={tooltipContent}
          className={Classes.MINIMAL + ' ' + Classes.SMALL}
          iconName={ToggleSearchAudioButton.generateButtonIcon(
            globalAudioEnabled,
            searchAudioEnabled
          )}
          onClick={onClick}
        />
      </Tooltip>
    );
  }
}

const mapState = (state: RootState): Props => ({
  globalAudioEnabled: state.audioSettingsV1.enabled,
  searchAudioEnabled: state.searchAudioEnabled
});

const mapDispatch = (dispatch: Dispatch<ToggleSearchAudio>): Handlers => ({
  onClick: () => dispatch(toggleSearchAudio())
});

export default connect(mapState, mapDispatch)(ToggleSearchAudioButton);
