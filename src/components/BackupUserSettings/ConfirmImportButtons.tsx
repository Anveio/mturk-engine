import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ButtonGroup, Button } from '@shopify/polaris';
import SelectSettingsDialog from './SelectSettingsDialog';
import StateKeyCheckboxList from './StateKeyCheckboxList';
import { writePersistedState, WritePersistedState } from '../../actions/backup';
import { PersistedState, RootState, PersistedStateKey } from '../../types';
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
        ? generateCheckStateKeysMap(true)(props.uploadedState)
        : new Map()
    };
  }

  private toggleAllCheckboxes = (uploadedState: Partial<PersistedState>) => (
    status: boolean
  ) =>
    this.setState({
      checkedStateKeysMap: generateCheckStateKeysMap(status)(uploadedState)
    });

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
        <SelectSettingsDialog
          modalOpen={this.state.modalOpen}
          onClose={this.toggleModal}
          onToggleAll={this.toggleAllCheckboxes(uploadedState)}
        >
          <StateKeyCheckboxList
            checkedStateKeysMap={this.state.checkedStateKeysMap}
            onClick={this.toggleCheckbox}
          />
        </SelectSettingsDialog>
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
