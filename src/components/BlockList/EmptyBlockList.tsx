import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { changeTab } from '../../actions/updateValue';
import { Button } from '@shopify/polaris';
import { NonIdealState } from '@blueprintjs/core';

export interface Handlers {
  onChangeTab: () => void;
}

// tslint:disable:jsx-curly-spacing
const EmptyQueue = ({ onChangeTab }: Handlers) => {
  return (
    <NonIdealState
      title="Your blocklists are empty."
      description="You can manage your block lists here once you've blocked a HIT or a requester."
      visual="add-to-folder"
      action={
        <Button primary onClick={onChangeTab}>
          Switch to search tab
        </Button>
      }
    />
  );
};

const mapDispatch = (dispatch: Dispatch): Handlers => ({
  onChangeTab: () => dispatch(changeTab(0))
});

export default connect(null, mapDispatch)(EmptyQueue);
