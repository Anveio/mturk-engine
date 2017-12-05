import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ButtonGroup, Button, Card } from '@shopify/polaris';
import { Dialog } from '@blueprintjs/core';
import { writePersistedState, WritePersistedState } from '../../actions/backup';
import { PersistedState, RootState, PersistedStateKey } from '../../types';
import StateKeyCheckboxList from './StateKeyCheckboxList';
import { generateCheckStateKeysMap } from '../../utils/backup';
import { validUploadedState } from '../../selectors/uploadedState';

interface Props {
  readonly uploadedState: Partial<PersistedState> | null;
}

interface Handlers {
  readonly onClick: (payload: PersistedStateKey[]) => void;
}

interface State {
  readonly modalOpen: boolean;
  readonly checkedStateKeysMap: Map<PersistedStateKey, boolean>;
}

class ConfirmImportButtons extends React.PureComponent<
  Props & Handlers,
  State
> {
  constructor(props: Props & Handlers) {
    super(props);
    this.state = {
      modalOpen: false,
      checkedStateKeysMap: props.uploadedState
        ? generateCheckStateKeysMap(props.uploadedState)
        : new Map()
    };
  }

  private toggleCheckbox = (key: PersistedStateKey, value: boolean) => {
    this.setState((prevState: State): Partial<State> => {
      const newState = new Map<PersistedStateKey, boolean>(
        prevState.checkedStateKeysMap
      );
      return {
        checkedStateKeysMap: newState.set(key, value)
      };
    });
  };

  private generateWhiteList = (): PersistedStateKey[] => {
    const { checkedStateKeysMap } = this.state;
    return Array.from(checkedStateKeysMap.keys()).reduce(
      (acc: PersistedStateKey[], key: PersistedStateKey) =>
        checkedStateKeysMap.get(key) ? [...acc, key] : acc,
      []
    );
  };

  private toggleModal = () =>
    this.setState((prevState: State): Partial<State> => ({
      modalOpen: !prevState.modalOpen
    }));

  public render() {
    const { uploadedState, onClick } = this.props;
    return uploadedState ? (
      <ButtonGroup>
        <Button
          onClick={() => onClick(this.generateWhiteList())}
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
              checkedStateKeysMap={this.state.checkedStateKeysMap}
              onClick={this.toggleCheckbox}
            />
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
  onClick: (whiteList: PersistedStateKey[]) =>
    dispatch(writePersistedState(whiteList))
});

export default connect(mapState, mapDispatch)(ConfirmImportButtons);
