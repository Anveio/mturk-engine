import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ButtonGroup, Button, Card } from '@shopify/polaris';
import { Dialog } from '@blueprintjs/core';
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

interface State {
  readonly modalOpen: boolean;
}

class ConfirmImportButton extends React.PureComponent<Props & Handlers, State> {
  public readonly state: State = { modalOpen: false };

  private toggleModal = () =>
    this.setState((prevState: State): Partial<State> => ({
      modalOpen: !prevState.modalOpen
    }));

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
        <Button onClick={this.toggleModal}>Select Settings</Button>
        <Dialog
          isOpen={this.state.modalOpen}
          iconName="changes"
          title="Pick which settings you would like to import."
          onClose={this.toggleModal}
          
        >
          <Card
            sectioned
            primaryFooterAction={{
              content: 'Close',
              onAction: this.toggleModal
            }}
          >
            <StateKeyCheckboxList uploadedState={uploadedState} />
          </Card>
        </Dialog>
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
