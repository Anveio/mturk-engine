import * as React from 'react';
import { Checkbox } from '@shopify/polaris';
import { PersistedStateKeys } from '../../types';
import { stateKeyMap } from '../../utils/backup';
// import { PersistedState } from '../../types';

export interface Props {
  readonly stateKey: PersistedStateKeys;
  readonly checked: boolean;
}

export interface Handlers {
  // tslint:disable-next-line:no-any
  readonly onClick: (key: PersistedStateKeys, value: any) => void;
}

class StateKeyCheckbox extends React.Component<Props & Handlers, never> {
  public render() {
    const { onClick, checked, stateKey } = this.props;
    return (
      <Checkbox
        checked={checked}
        label={stateKeyMap.get(stateKey) || stateKey}
        onChange={() => onClick(stateKey, !checked)}
      />
    );
  }
}

export default StateKeyCheckbox;
