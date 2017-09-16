import * as React from 'react';
import { Button } from '@shopify/polaris';
import { NonIdealState } from '@blueprintjs/core';

export interface Handlers {
  readonly onRefresh: () => void;
}

const EmptyQueue = ({ onRefresh }: Handlers) => {
  return (
    <NonIdealState
      title="Your queue is empty"
      description="You can click refresh or switch to the search tab."
      visual="refresh"
      action={
        <Button primary onClick={onRefresh}>
          Refresh
        </Button>}
    />
  );
};

export default EmptyQueue;
