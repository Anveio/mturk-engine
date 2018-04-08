import * as React from 'react';
import { Popover, Position, Button, Intent } from '@blueprintjs/core';
import AccountStatisticsTable from './AccountStatisticsTable';
import { SMALL_MINIMAL_BUTTON } from 'constants/blueprint';

export interface Props {
  readonly fullName: string;
}

class UsernameButton extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Popover position={Position.BOTTOM}>
        <Button
          intent={Intent.PRIMARY}
          className={SMALL_MINIMAL_BUTTON}
          rightIcon="th-list"
        >
          {this.props.fullName}
        </Button>
        <AccountStatisticsTable />
      </Popover>
    );
  }
}

export default UsernameButton;
