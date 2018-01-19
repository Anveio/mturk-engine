import * as React from 'react';
import { SettingToggle } from '@shopify/polaris';
import {
  ToggleNotifications,
  toggleNotifications
} from '../../actions/notifications';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../types';

interface Handlers {
  readonly onToggle: () => void;
}

interface Props {
  readonly enabled: boolean;
}

class EnableNotifications extends React.Component<Props & Handlers, never> {
  public render() {
    return !this.props.enabled ? (
      <SettingToggle
        enabled={this.props.enabled}
        action={{
          content: 'Enable',
          onAction: this.props.onToggle
        }}
      >
        Desktop notifications are currently <strong>disabled</strong>.
      </SettingToggle>
    ) : null;
  }
}

const mapDispatch = (dispatch: Dispatch<ToggleNotifications>): Handlers => ({
  onToggle: () => dispatch(toggleNotifications())
});

const mapState = (state: RootState): Props => ({
  enabled: state.notificationSettings.enabled
});

export default connect(mapState, mapDispatch)(EnableNotifications);
