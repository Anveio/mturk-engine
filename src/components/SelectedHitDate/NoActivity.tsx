import * as React from 'react';
import { NonIdealState } from '@blueprintjs/core';
import { Card } from '@shopify/polaris';

const NoActivity: React.SFC<{}> = () => (
  <Card.Section>
    <NonIdealState
      title="No activity recorded for this day."
      visual="calendar"
    />
  </Card.Section>
);

export default NoActivity;
