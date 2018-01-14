import * as React from 'react';
import { Layout, Card } from '@shopify/polaris';
import EnableNotificationsButton from './EnableNotificationsButton';

export interface Props {}

class NotificationSettings extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Layout.AnnotatedSection
        title="Enable Notifications"
        description={
          'Notifications will be displayed on your desktop when a new HIT is found.'
        }
      >
        <Card>
          <EnableNotificationsButton />
        </Card>
      </Layout.AnnotatedSection>
    );
  }
}

export default NotificationSettings;
