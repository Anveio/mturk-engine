import * as React from 'react';
import { Layout, Card } from '@shopify/polaris';

import EditMinTO from './EditMinTO';
import ToggleMinimumTO from './ToggleMinimumTO';

const TurkopticonSettings = () => {
  return (
    <Layout.AnnotatedSection
      title="Enable minimum Turkopticon score"
      description="You can hide HITs by requesters that fall below a certain score."
    >
      <Card>
        <ToggleMinimumTO />
        <Card.Section>
          <EditMinTO />
        </Card.Section>
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default TurkopticonSettings;
