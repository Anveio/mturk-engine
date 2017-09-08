import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ChangeTab, changeTab } from '../../actions/tab';
import { EmptyState } from '@shopify/polaris';

export interface Handlers {
  onChangeTab: () => void;
}

const EmptyQueue = ({ onChangeTab }: Handlers) => {
  return (
    <EmptyState
      heading="Your block lists are empty."
      action={{
        content: 'Switch to search tab',
        onAction: onChangeTab
      }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>
        You can manage your block lists here once you've blocked a HIT or a
        requester.
      </p>
    </EmptyState>
  );
};

const mapDispatch = (dispatch: Dispatch<ChangeTab>): Handlers => ({
  onChangeTab: () => dispatch(changeTab(0))
});

export default connect(null, mapDispatch)(EmptyQueue);
