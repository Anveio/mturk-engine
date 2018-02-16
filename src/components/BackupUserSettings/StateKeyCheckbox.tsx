import * as React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from '@shopify/polaris';
import { PersistedStateKey, RootState } from '../../types';
import { stateKeyMap } from '../../utils/backup';
import { numImmutableEntries } from '../../selectors/uploadedState';
// import { PersistedState } from '../../types';

export interface OwnProps {
  readonly stateKey: PersistedStateKey;
  readonly checked: boolean;
}

export interface Props {
  readonly immutableEntriesSize: number | null;
}

export interface Handlers {
  // tslint:disable-next-line:no-any
  readonly onClick: (key: PersistedStateKey, value: boolean) => void;
}

class StateKeyCheckbox extends React.Component<Props & OwnProps & Handlers> {
  private generateHelpText = (stateKey: PersistedStateKey): string => {
    const { immutableEntriesSize } = this.props;
    if (immutableEntriesSize === null) {
      return '';
    } else {
      return `${immutableEntriesSize} entries found.`;
    }
  };

  public render() {
    const { onClick, checked, stateKey } = this.props;
    return (
      <Checkbox
        checked={checked}
        label={stateKeyMap.get(stateKey) || stateKey}
        onChange={() => onClick(stateKey, !checked)}
        helpText={this.generateHelpText(stateKey)}
      />
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  immutableEntriesSize: numImmutableEntries(state, ownProps.stateKey)
});

export default connect(mapState)(StateKeyCheckbox);
