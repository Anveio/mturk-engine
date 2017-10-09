import * as React from 'react';
import { Popover, Position, Button } from '@blueprintjs/core';
import AccountStatisticsTable from './AccountStatisticsTable';

export interface Props {
  readonly fullName: string;
}

class UsernameButton extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Popover position={Position.BOTTOM}>
        <Button
          intent={0}
          className="pt-button pt-small pt-minimal"
          rightIconName="pt-icon-th-list"
        >
          {this.props.fullName}
        </Button>
        <AccountStatisticsTable />
      </Popover>
    );
  }
}

export default UsernameButton;
