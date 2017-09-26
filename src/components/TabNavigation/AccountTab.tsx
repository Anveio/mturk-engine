import * as React from 'react';
import Account from '../Account/Account';
export interface Props {}

class AccountTab extends React.PureComponent<Props, never> {
  public render() {
    return <Account />;
  }
}

export default AccountTab;
