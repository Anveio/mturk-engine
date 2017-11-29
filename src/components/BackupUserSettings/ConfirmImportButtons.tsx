import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ButtonGroup, Button, Card } from '@shopify/polaris';
import { Dialog } from '@blueprintjs/core';
import { writePersistedState, WritePersistedState } from '../../actions/backup';
import { PersistedState, RootState, PersistedStateKeys } from '../../types';
import StateKeyCheckboxList from './StateKeyCheckboxList';
import { generateCheckStateKeysMap } from '../../utils/backup';

interface Props {
  readonly uploadedState: Partial<PersistedState> | null;
}

interface Handlers {
  readonly onClick: (payload: Partial<PersistedState>) => void;
}

interface State {
  readonly modalOpen: boolean;
  readonly checkedStateKeysMap: Map<PersistedStateKeys, boolean>;
}

class ConfirmImportButtons extends React.PureComponent<Props & Handlers, State> {
  constructor(props: Props & Handlers) {
    super(props);
    this.state = {
      modalOpen: false,
      checkedStateKeysMap: props.uploadedState
        ? generateCheckStateKeysMap(props.uploadedState)
        : new Map()
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
            <StateKeyCheckboxList
              uploadedState={uploadedState}
              checkedStateKeysMap={this.state.checkedStateKeysMap}
              onClick={this.handleClick}
            />
          </Card>
        </Dialog>
      </ButtonGroup>
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  uploadedState: state
});

const mapDispatch = (dispatch: Dispatch<WritePersistedState>): Handlers => ({
  onClick: (payload: Partial<PersistedState>) =>
    dispatch(writePersistedState(payload))
});

export default connect(mapState, mapDispatch)(ConfirmImportButtons);
