import * as React from 'react';
import { Layout, Card } from '@shopify/polaris';

import ToggleNoTO from './ToggleNoTO';
import EditMinTO from './EditMinTO';
import ToggleMinimumTO from './ToggleMinimumTO';

const TurkopticonSettings = () => {
  return (
    <div>
      <Layout.AnnotatedSection
        title="Hide requesters with no Turkopticon score"
        description="Turning this setting on will hide HITs from requesters that have no Turkopticon reviews."
      >
        <ToggleNoTO />
      </Layout.AnnotatedSection>
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
    </div>
  );
};

export default TurkopticonSettings;
