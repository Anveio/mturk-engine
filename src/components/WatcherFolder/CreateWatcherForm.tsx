import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AddWatcher, addWatcher } from '../../actions/watcher';
import { Card, FormLayout, TextField, Button } from '@shopify/polaris';
import {
  determineInputType,
  parseProjectIdFromProjectLink,
  parseGroupId,
  createDefaultWatcher
} from '../../utils/watchers';
import { watchForEnter } from '../../utils/watchForEnter';
import { Watcher, RootState, WatcherMap } from '../../types';
import {
  validateInputPandaLink,
  validateProjectIdLink
} from '../../utils/validation';
import { normalizedWatchers } from '../../selectors/watchers';
import { truncate } from '../../utils/formatting';
import { showPlainToast } from '../../utils/toaster';

interface OwnProps {
  readonly folderId: string;
}

interface Props {
  readonly watchers: WatcherMap;
}

interface Handlers {
  readonly onAddWatcher: (watcher: Watcher) => void;
}

interface InputState {
  readonly groupIdInput: string;
  readonly titleInput: string;
  readonly descriptionInput: string;
}

interface ErrorState {
  readonly error: string | null;
}

type InputField = keyof InputState;

type State = InputState & ErrorState;

class CreateWatcherForm extends React.PureComponent<
  Props & OwnProps & Handlers,
  State
> {
  public readonly state: State = {
    groupIdInput: '',
    titleInput: '',
    descriptionInput: '',
    error: null
  };

  private createWatcher = (groupId: string, folderId: string): Watcher => ({
    ...createDefaultWatcher(groupId),
    description: this.state.descriptionInput,
    folderId: folderId,
    title: this.state.titleInput || groupId,
    createdOn: new Date()
  });

  private confirmSubmit = (id: string, valid: boolean) => {
    if (!valid) {
      this.displayInvalidIdError();
      return;
    }

    const maybeDuplicateWatcher = this.props.watchers.get(id);

    if (maybeDuplicateWatcher) {
      this.displayDuplicateWatcherError(maybeDuplicateWatcher);
      return;
    }

    this.props.onAddWatcher(this.createWatcher(id, this.props.folderId));
    showPlainToast(`Watcher with ID: ${id} created.`);
  };

  private handleSubmit = () => {
    const { groupIdInput } = this.state;
    const inputType = determineInputType(groupIdInput);

    switch (inputType) {
      case 'GROUP_ID':
        this.confirmSubmit(groupIdInput, true);
        break;
      case 'LEGACY': {
        this.confirmSubmit(
          parseGroupId(groupIdInput),
          validateInputPandaLink(groupIdInput)
        );
        break;
      }
      case 'WORKER': {
        this.confirmSubmit(
          parseProjectIdFromProjectLink(groupIdInput),
          validateProjectIdLink(groupIdInput)
        );
        break;
      }
      case 'INVALID':
        this.displayInvalidIdError();
        break;
      default:
        this.displayInvalidIdError();
    }
  };

  private displayInvalidIdError = () =>
    this.setState(() => ({
      error: `That doesn't appear to be a valid project ID or project link.`
    }));

  private displayDuplicateWatcherError = (watcher: Watcher) =>
    this.setState(() => ({
      error: `Watcher "${truncate(watcher.title, 55)}" has duplicate ID.`
    }));

  private handleInput = (field: InputField) => (value: string) =>
    this.setState((): Pick<State, 'error'> => ({
      [field]: value,
      error: null
    }));

  private handleEnterKeyPress = watchForEnter<HTMLDivElement>(
    this.handleSubmit
  );

  public render() {
    return (
      <Card sectioned title="Create a watcher in this folder">
        <div onKeyPress={this.handleEnterKeyPress}>
          <FormLayout>
            <TextField
              autoFocus
              label="Project ID"
              id="new-watcher-id"
              helpText="Can also be the URL of a 'Preview & Work' link."
              value={this.state.groupIdInput}
              error={this.state.error || false}
              onChange={this.handleInput('groupIdInput')}
              autoComplete={false}
              spellCheck={false}
            />
            <TextField
              label="Title (optional)"
              id="new-watcher-title"
              value={this.state.titleInput}
              onChange={this.handleInput('titleInput')}
              autoComplete={false}
              spellCheck={false}
            />
            <TextField
              label="Description (optional)"
              id="new-watcher-description"
              value={this.state.descriptionInput}
              onChange={this.handleInput('descriptionInput')}
              autoComplete={false}
              spellCheck={false}
            />
            <Button icon="circlePlus" primary onClick={this.handleSubmit}>
              Add Watcher
            </Button>
          </FormLayout>
        </div>
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  watchers: normalizedWatchers(state)
});

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (watcher: Watcher) => dispatch(addWatcher(watcher))
});

export default connect(mapState, mapDispatch)(CreateWatcherForm);
