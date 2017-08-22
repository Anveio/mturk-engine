import * as React from 'react';
import { EmptyState } from '@shopify/polaris';
import { SearchOptions } from '../../types';

export interface Props {
  options: SearchOptions;
  
}

export interface Handlers {
  onFetch: (options: SearchOptions) => void;
}

const EmptySearchTable = ({ onFetch, options }: Props & Handlers) => {
  const onAction = () => {
    onFetch(options);
  };

  return (
    <EmptyState
      heading="You search results are empty."
      action={{
        content: 'Search HITs',
        onAction
      }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>Search for HITs to get started.</p>
    </EmptyState>
  );
};

export default EmptySearchTable;
