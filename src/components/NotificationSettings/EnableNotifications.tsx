import * as React from 'react';
import { Card, Button } from '@shopify/polaris';
import {
  NotificationPermissionRequest,
  notificationPermissionRequest
} from '../../actions/notifications';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../types';

interface Handlers {
  readonly onEnable: () => void;
}

interface Props {
  readonly hasPermission: boolean;
}

class EnableNotifications extends React.Component<Props & Handlers, never> {
  /**
   * TODO: TypeScript's type definitions for Notifications are incorrect. Notifications.permission is missing.
   * When it's fixed, add a check for Notification.permission in cWM and render if  not "granted".
   */
  public render() {
    return !this.props.hasPermission ? (
      <Card sectioned>
        <Button onClick={this.props.onEnable}>Request Permission</Button>
      </Card>
    ) : null;
  }
}

const mapDispatch = (
  dispatch: Dispatch<NotificationPermissionRequest>
): Handlers => ({
  onEnable: () => dispatch(notificationPermissionRequest())
});

const mapState = (state: RootState): Props => ({
  hasPermission: state.notificationSettings.hasPermission
});

export default connect(mapState, mapDispatch)(EnableNotifications);
