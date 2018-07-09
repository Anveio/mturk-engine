import * as React from 'react';
import { connect } from 'react-redux';
import { Card, FormLayout } from '@shopify/polaris';
import { NotificationSettings, RootState } from '../../types';
import { notificationPermissionRequest } from '../../actions/notifications';
import {
  EditNotificationThresholdField,
  EditNotificationDurationField
} from './NotificationSettingsTextFields';

interface Props {
  readonly notificationSettings: NotificationSettings;
}

interface Handlers {
  readonly onRequestPermission: () => void;
}

class EditNotificationSettings extends React.PureComponent<
  Props & Handlers,
  never
> {
  public render() {
    const { enabled } = this.props.notificationSettings;

    return (
      enabled && (
        <Card
          sectioned
          title="Edit notification settings"
          actions={[
            {
              content: 'Request Permission',
              onAction: this.props.onRequestPermission
            }
          ]}
        >
          <FormLayout>
            <EditNotificationThresholdField />
            <EditNotificationDurationField />
          </FormLayout>
        </Card>
      )
    );
  }
}

const mapState = (state: RootState): Props => ({
  notificationSettings: state.notificationSettings
});

const mapDispatch: Handlers = {
  onRequestPermission: notificationPermissionRequest
};

export default connect(
  mapState,
  mapDispatch
)(EditNotificationSettings);
