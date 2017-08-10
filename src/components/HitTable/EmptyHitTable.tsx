import * as React from 'react';
import { EmptyState } from '@shopify/polaris';

export interface Props {
  onAction: () => void;
}

const EmptyHitTable = ({ onAction }: Props) => {
  return (
    <EmptyState
      heading="You haven't searched any HITs yet."
      action={{
        content: 'Search HITs',
        onAction
      }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>Search some HITs to get started.</p>
    </EmptyState>
  );
};

export default EmptyHitTable;