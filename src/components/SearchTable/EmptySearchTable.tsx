import * as React from 'react';
import { EmptyState } from '@shopify/polaris';
import { connect } from 'react-redux';
import { searchRequestSingular } from '../../actions/search';

interface Handlers {
  readonly onSearch: () => void;
}

const EmptySearchTable: React.SFC<Handlers> = ({ onSearch }) => {
  return (
    <EmptyState
      heading="Welcome to Mturk Engine."
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

const mapDispatch: Handlers = {
  onSearch: searchRequestSingular
};

export default connect(
  null,
  mapDispatch
)(EmptySearchTable);
