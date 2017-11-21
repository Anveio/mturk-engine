import * as React from 'react';
import { Checkbox } from '@shopify/polaris';
import { PersistedStateKeys } from '../../types';
import { stateKeyMap } from '../../utils/backup';
// import { PersistedState } from '../../types';

export interface Props {
  readonly stateKey: PersistedStateKeys;
  readonly stateValue: any;
  readonly checked: boolean;
}

class StateKeyCheckbox extends React.Component<Props, never> {
  public render() {
    return (
      <Checkbox
        checked={this.props.checked}
        label={stateKeyMap.get(this.props.stateKey) || 'Invalid Key'}
      />
    );
  }
}

export default StateKeyCheckbox;
