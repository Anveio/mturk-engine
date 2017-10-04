import * as React from 'react';
import { NonIdealState } from '@blueprintjs/core';
import { Card } from '@shopify/polaris';

class NoActivity extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Card.Section>
        <NonIdealState
          title="No activity recorded for this day."
          visual="pt-icon-calendar"
        />
      </Card.Section>
    );
  }
}

export default NoActivity;
