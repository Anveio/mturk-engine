import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ButtonGroup, Button, Card } from '@shopify/polaris';
import { Popover } from '@blueprintjs/core';
import { writePersistedState, WritePersistedState } from '../../actions/backup';
import { PersistedState, RootState } from '../../types';
import StateKeyCheckboxList from './StateKeyCheckboxList';
import { validUploadedState } from '../../selectors/uploadedState';

interface Props {
  readonly uploadedState: Partial<PersistedState> | null;
}

interface Handlers {
  readonly onClick: (payload: Partial<PersistedState>) => void;
}

class ConfirmImportButton extends React.PureComponent<Props & Handlers, never> {
  public render() {
    const { uploadedState } = this.props;
    return uploadedState ? (
      <ButtonGroup>
        <Button
          onClick={() => this.props.onClick(uploadedState)}
          primary
          icon="import"
        >
          Confirm Selection & Import
        </Button>
        <Popover>
          <Button>Select Settings</Button>
          <Card sectioned>
            <StateKeyCheckboxList uploadedState={uploadedState} />
          </Card>
        </Popover>
      </ButtonGroup>
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  uploadedState: validUploadedState(state)
});

const mapDispatch = (dispatch: Dispatch<WritePersistedState>): Handlers => ({
  onClick: (payload: Partial<PersistedState>) =>
    dispatch(writePersistedState(payload))
});

export default connect(mapState, mapDispatch)(ConfirmImportButton);
