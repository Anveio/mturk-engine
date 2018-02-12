import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, FormLayout } from '@shopify/polaris';
import { NotificationSettings, RootState } from '../../types';
import {
  notificationPermissionRequest,
  toggleNotifications,
  NotificationAction
} from '../../actions/notifications';
import {
  EditNotificationThresholdField,
  EditNotificationDurationField
} from './NotificationSettingsTextFields';

interface Props {
  notificationSettings: NotificationSettings;
}

interface Handlers {
  readonly onRequestPermission: () => void;
  readonly onToggle: () => void;
}

class EditNotificationSettings extends React.PureComponent<
  Props & Handlers,
  never
> {
  /**
   * TODO: TypeScript's type definitions for Notifications are incorrect. Notifications.permission is missing.
   * When it's fixed, add a check for Notification.permission in cWM and render if  not "granted".
   */
  public render() {
    const { enabled } = this.props.notificationSettings;

    return enabled ? (
      <Card
        sectioned
        title="Edit Notification Settings"
        actions={[
          {
            content: 'Request Permission',
            onAction: this.props.onRequestPermission
          },
          {
            content: 'Disable Notifications',
            onAction: this.props.onToggle
          }
        ]}
      >
        <FormLayout>
          <EditNotificationThresholdField />
          <EditNotificationDurationField />
        </FormLayout>
      </Card>
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  notificationSettings: state.notificationSettings
});

const mapDispatch = (dispatch: Dispatch<NotificationAction>): Handlers => ({
  onRequestPermission: () => dispatch(notificationPermissionRequest()),
  onToggle: () => dispatch(toggleNotifications())
});

export default connect(mapState, mapDispatch)(EditNotificationSettings);
