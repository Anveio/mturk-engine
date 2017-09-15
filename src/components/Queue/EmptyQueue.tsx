import * as React from 'react';
import { Button } from '@shopify/polaris';
import { NonIdealState } from '@blueprintjs/core';

export interface Handlers {
  readonly onRefresh: () => void;
}

const EmptyQueue = ({ onRefresh }: Handlers) => {
  return (
    // <EmptyState
    //   heading="Your queue is empty."
    //   action={{
    //     content: 'Refresh queue',
    //     onAction: onRefresh
    //   }}
    //   image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    // >
    //   <p>Switch to the search tab to accept some HITs.</p>
    // </EmptyState>
    <NonIdealState
      title="Your queue is empty"
      description="You can click refresh or switch to the search tab."
      visual="refresh"
      action={
        <Button primary onClick={onRefresh}>
          Refresh
        </Button>
      }
    />
  );
};

export default EmptyQueue;
