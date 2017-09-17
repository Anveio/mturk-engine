import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ChangeTab, changeTab } from '../../actions/tab';
import { NonIdealState, Button } from '@blueprintjs/core';
// import { Button } from '@shopify/polaris';

export interface Handlers {
  onChangeTab: () => void;
}

const EmptyQueue = ({ onChangeTab }: Handlers) => {
  return (
    <NonIdealState
      className="Polaris-EmptyState__Section"
      title="Your blocklists are empty."
      description="You can manage your block lists here once you've blocked a HIT or a requester."
      visual="add-to-folder"
      action={<Button onClick={onChangeTab}>Switch to search tab</Button>}
    />
  );
};

const mapDispatch = (dispatch: Dispatch<ChangeTab>): Handlers => ({
  onChangeTab: () => dispatch(changeTab(0))
});

export default connect(null, mapDispatch)(EmptyQueue);
