import * as React from 'react';
import { EmptyState } from '@shopify/polaris';

export interface Handlers {
  onRefresh: () => void;
}

const EmptyQueue = ({ onRefresh }: Handlers) => {
  return (
    <EmptyState
      heading="Your queue is empty."
      action={{
        content: 'Search for hits'
      }}
      secondaryAction={{
        content: 'Refresh queue',
        onAction: onRefresh
      }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>Switch to the search tab to find some HITs to accept.</p>
    </EmptyState>
  );
};

export default EmptyQueue;
