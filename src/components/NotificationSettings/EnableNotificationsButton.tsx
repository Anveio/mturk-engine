import * as React from 'react';
import { Button } from '@shopify/polaris';
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

class EnableNotificationsButton extends React.Component<
  Props & Handlers,
  never
> {
  public render() {
    return <Button onClick={this.props.onEnable}>Sample Text</Button>;
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

export default connect(mapState, mapDispatch)(EnableNotificationsButton);
