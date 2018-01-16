import * as React from 'react';
import { Layout } from '@shopify/polaris';
import EnableNotifications from './EnableNotifications';
import EditNotificationSettings from './EditNotificationSettings';
import { connect } from 'react-redux';
import { RootState, NotificationSettings } from '../../types';

interface Props {
  readonly notificationSettings: NotificationSettings;
}

class NotificationsSettingsSection extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Layout.AnnotatedSection
        title="Enable desktop notifications"
        description={
          'A link to accept an unread HIT will be sent to your desktop. You can revoke permission at any time.'
        }
      >
        <EnableNotifications />
        <EditNotificationSettings />
      </Layout.AnnotatedSection>
    );
  }
}

const mapState = (state: RootState): Props => ({
  notificationSettings: state.notificationSettings
});

export default connect(mapState)(NotificationsSettingsSection);
