import * as React from 'react';
import { NonIdealState } from '@blueprintjs/core';

export interface Props {}

class EmptyWatchers extends React.PureComponent<Props, never> {
  public render() {
    return (
      <NonIdealState
        title="You have no watchers."
        description="Watchers periodically will accept a HIT. They're useful for hoarding lots of HITs or snagging rare ones."
        visual="menu-closed"
      />
    );
  }
}

export default EmptyWatchers;
