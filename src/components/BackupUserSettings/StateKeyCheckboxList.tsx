import * as React from 'react';
import { FormLayout } from '@shopify/polaris';
import { PersistedState, PersistedStateKeys } from '../../types';
import StateKeyCheckbox from './StateKeyCheckbox';

export interface Props {
  readonly uploadedState: Partial<PersistedState>;
  readonly checkedStateKeysMap: Map<PersistedStateKeys, boolean>;
}

export interface Handlers {
  // tslint:disable-next-line:no-any
  readonly onClick: (key: PersistedStateKeys, value: any) => void;
}

class StateKeyCheckboxList extends React.Component<Props & Handlers, never> {
  public render() {
    const { uploadedState, checkedStateKeysMap, onClick } = this.props;

    return (
      <FormLayout>
        {/* <Heading>Pick which settings you would like to import.</Heading> */}
        {Object.keys(uploadedState).map((stateKey: PersistedStateKeys) => (
          <StateKeyCheckbox
            key={stateKey}
            stateKey={stateKey}
            checked={checkedStateKeysMap.get(stateKey) || false}
            onClick={onClick}
          />
        ))}
      </FormLayout>
    );
  }
}

export default StateKeyCheckboxList;
