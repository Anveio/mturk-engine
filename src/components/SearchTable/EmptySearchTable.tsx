import * as React from 'react';
import { EmptyState } from '@shopify/polaris';

export interface Handlers {
  onSearch: () => void;
}

const EmptySearchTable = ({ onSearch }: Handlers) => {
  return (
    <EmptyState
      heading="You search results are empty."
      action={{
        content: 'Search HITs',
        onAction: onSearch
      }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>Search for HITs to get started.</p>
    </EmptyState>
  );
};

export default EmptySearchTable;
