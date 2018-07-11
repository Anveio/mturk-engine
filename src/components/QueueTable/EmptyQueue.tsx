import * as React from 'react';
import { Button } from '@shopify/polaris';
import { NonIdealState } from '@blueprintjs/core';

export interface Handlers {
  readonly onRefresh: () => void;
}

// tslint:disable:jsx-curly-spacing
const EmptyQueue: React.SFC<Handlers> = ({ onRefresh }) => {
  return (
    <NonIdealState
      title="Your queue is empty."
      description="Accept HITs from the search tab and they'll show up here."
      icon="projects"
      action={
        <Button primary onClick={onRefresh}>
          Refresh
        </Button>
      }
    />
  );
};

export default EmptyQueue;
