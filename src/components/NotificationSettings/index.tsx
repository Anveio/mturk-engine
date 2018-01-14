import * as React from 'react';
import { Layout, Card } from '@shopify/polaris';
import EnableNotifications from './EnableNotifications';
import { connect } from 'react-redux';
import { RootState, NotificationSettings } from '../../types';

interface Props {
  readonly notificationSettings: NotificationSettings;
}

class EditNotificationSettings extends React.PureComponent<Props, State> {
  public render() {
    return (
      <Layout.AnnotatedSection
        title="Enable Notifications"
        description={
          'You can have notifications of new HITs be sent to your desktop.'
        }
      >
        <EnableNotifications />
      </Layout.AnnotatedSection>
    );
  }
}

const mapState = (state: RootState): Props => ({
  notificationSettings: state.notificationSettings
});

export default connect(mapState)(EditNotificationSettings);
