import * as React from 'react';
import { EmptyState } from '@shopify/polaris';

export interface Handlers {
  onRefresh: () => void;
}

const EmptyQueue = ({ onRefresh }: Handlers) => {
  return (
    <EmptyState
      heading="Your queue is empty or needs to be refreshed."
      action={{
        content: 'Refresh queue',
        onAction: onRefresh
      }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>
        If you know you have HITs in your queue, click the refresh button to see
        them.
      </p>
    </EmptyState>
  );
};

export default EmptyQueue;
