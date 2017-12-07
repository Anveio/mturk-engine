import * as React from 'react';
import { connect } from 'react-redux';
import { FormLayout } from '@shopify/polaris';
import {
  PersistedState,
  PersistedStateKey,
  RootState,
  ImmutablePersistedStateKey
} from '../../types';
import StateKeyCheckbox from './StateKeyCheckbox';
import { validUploadedState } from '../../selectors/uploadedState';
import { immutableStateKeyLookup } from '../../utils/backup';

export interface Props {
  readonly uploadedState: Partial<PersistedState> | null;
}

export interface OwnProps {
  readonly checkedStateKeysMap: Map<PersistedStateKey, boolean>;
}

export interface Handlers {
  // tslint:disable-next-line:no-any
  readonly onClick: (key: PersistedStateKey, value: any) => void;
}

class StateKeyCheckboxList extends React.Component<
  Props & OwnProps & Handlers,
  never
> {
  static keysGroupedImmutableFirst = (
    uploadedState: Partial<PersistedState>
  ) => {
    return Object.keys(uploadedState).sort(
      (a, b) =>
        immutableStateKeyLookup.has(a as ImmutablePersistedStateKey) ? -1 : 1
    );
  };

  public render() {
    const { uploadedState, checkedStateKeysMap, onClick } = this.props;

    return uploadedState ? (
      <FormLayout>
        {StateKeyCheckboxList.keysGroupedImmutableFirst(uploadedState).map(
          (stateKey: PersistedStateKey) => (
            <StateKeyCheckbox
              key={stateKey}
              stateKey={stateKey}
              checked={checkedStateKeysMap.get(stateKey) || false}
              onClick={onClick}
            />
          )
        )}
      </FormLayout>
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  uploadedState: validUploadedState(state)
});

export default connect(mapState)(StateKeyCheckboxList);
