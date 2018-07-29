import * as React from 'react';
import { SettingToggle } from '@shopify/polaris';
import { toggleNotifications } from '../../actions/notifications';
import { connect } from 'react-redux';
import { RootState } from '../../types';

interface Handlers {
  readonly onToggle: () => void;
}

interface Props {
  readonly enabled: boolean;
}

class EnableNotifications extends React.Component<Props & Handlers, never> {
  public render() {
    const { enabled, onToggle } = this.props;

    return (
      <SettingToggle
        enabled={enabled}
        action={{
          content: enabled ? 'Disable' : ' Enable',
          onAction: onToggle
        }}
      >
        Desktop notifications are currently{' '}
        <strong>{enabled ? 'enabled' : ' disabled'}</strong>.
      </SettingToggle>
    );
  }
}

const mapDispatch: Handlers = {
  onToggle: toggleNotifications
};

const mapState = (state: RootState): Props => ({
  enabled: state.notificationSettings.enabled
});

export default connect(
  mapState,
  mapDispatch
)(EnableNotifications);
