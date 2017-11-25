import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button } from '@shopify/polaris';
import { writePersistedState, WritePersistedState } from '../../actions/backup';
import { PersistedState, RootState } from '../../types';

export interface Props {
  readonly uploadedState: Partial<PersistedState> | null;
}

export interface Handlers {
  readonly onClick: (payload: Partial<PersistedState>) => void;
}

class ConfirmImportButton extends React.PureComponent<Props & Handlers, never> {
  public render() {
    const { uploadedState } = this.props;
    return uploadedState ? (
      <Button
        onClick={() => this.props.onClick(uploadedState)}
        primary
        icon="import"
      >
        Confirm Selection & Import
      </Button>
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  uploadedState: state.uploadedState
});

const mapDispatch = (dispatch: Dispatch<WritePersistedState>): Handlers => ({
  onClick: (payload: Partial<PersistedState>) =>
    dispatch(writePersistedState(payload))
});

export default connect(mapState, mapDispatch)(ConfirmImportButton);
