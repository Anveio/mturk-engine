import * as React from 'react';
import { FormLayout } from '@shopify/polaris';
import { PersistedState, PersistedStateKeys } from '../../types';
import StateKeyCheckbox from './StateKeyCheckbox';
import { generateCheckStateKeysMap } from '../../utils/backup';

export interface Props {
  readonly uploadedState: Partial<PersistedState>;
}

export interface Handlers {
  readonly onClick: (stateKey: PersistedStateKeys) => void;
}

export interface State {
  readonly checkedStateKeysMap: Map<PersistedStateKeys, boolean>;
}

class StateKeyCheckboxList extends React.PureComponent<Props, State> {
  constructor(props: Props & Handlers) {
    super(props);
    this.state = {
      checkedStateKeysMap: generateCheckStateKeysMap(this.props.uploadedState)
    };
  }

  private handleClick = (key: PersistedStateKeys, value: boolean) => {
    this.setState((prevState: State): Partial<State> => {
      const newState = new Map<PersistedStateKeys, boolean>(
        prevState.checkedStateKeysMap
      );
      return {
        checkedStateKeysMap: newState.set(key, value)
      };
    });
  };

  public render() {
    const { uploadedState } = this.props;

    return (
      <FormLayout>
        {Object.keys(uploadedState).map((stateKey: PersistedStateKeys) => (
          <StateKeyCheckbox
            key={stateKey}
            stateKey={stateKey}
            checked={this.state.checkedStateKeysMap.get(stateKey) || false}
            onClick={this.handleClick}
          />
        ))}
      </FormLayout>
    );
  }
}

export default StateKeyCheckboxList;
