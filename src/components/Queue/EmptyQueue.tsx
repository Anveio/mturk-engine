import * as React from 'react';
import { EmptyState } from '@shopify/polaris';

const EmptyQueue = () => {
  return (
    <EmptyState
      heading="You have no HITs in your queue."
      action={{
        content: 'Search for hits'
      }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>Switch to the search tab to find some HITs to accept.</p>
    </EmptyState>
  );
};

export default EmptyQueue;
