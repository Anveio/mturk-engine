import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AddWatcher, addWatcher } from '../../actions/watcher';
import { Card, FormLayout, TextField, Button } from '@shopify/polaris';
import {
  determineInputType,
  parseProjectIdFromProjectLink
} from '../../utils/watchers';
import { watchForEnter } from '../../utils/watchForEnter';
import { Watcher } from '../../types';
import {
  validateInputPandaLink,
  validateProjectIdLink
} from '../../utils/validation';

interface OwnProps {
  readonly folderId: string;
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

type State = InputState & ErrorState;

class CreateWatcherForm extends React.PureComponent<
  OwnProps & Handlers,
  State
> {
  public readonly state: State = {
    groupIdInput: '',
    titleInput: '',
    descriptionInput: '',
    error: null
  };

  private static createWatcher = (input: State, folderId: string): Watcher => ({
    groupId: input.groupIdInput,
    delay: 5,
    description: input.descriptionInput,
    folderId: folderId,
    title: input.titleInput || input.groupIdInput,
    createdOn: new Date(),
    stopAfterFirstSuccess: true
  });

  private static parseGroupId = (input: string): string =>
    input.split('groupId=')[1];

  private handleWorkerLinkInput = () => {
    const { groupIdInput } = this.state;
    const { onAddWatcher, folderId } = this.props;
    const valid = validateProjectIdLink(groupIdInput);
    valid
      ? onAddWatcher(
          CreateWatcherForm.createWatcher(
            {
              ...this.state,
              groupIdInput: parseProjectIdFromProjectLink(groupIdInput)
            },
            folderId
          )
        )
      : this.displayError();
  };

  private handleLegacyLinkInput = () => {
    const { groupIdInput } = this.state;
    const { onAddWatcher, folderId } = this.props;
    const valid = validateInputPandaLink(groupIdInput);
    valid
      ? onAddWatcher(
          CreateWatcherForm.createWatcher(
            {
              ...this.state,
              groupIdInput: CreateWatcherForm.parseGroupId(groupIdInput)
            },
            folderId
          )
        )
      : this.displayError();
  };

  private handleSubmit = () => {
    const { onAddWatcher, folderId } = this.props;
    const inputType = determineInputType(this.state.groupIdInput);

    switch (inputType) {
      case 'GROUP_ID':
        onAddWatcher(CreateWatcherForm.createWatcher(this.state, folderId));
        break;
      case 'LEGACY': {
        this.handleLegacyLinkInput();
        break;
      }
      case 'WORKER': {
        this.handleWorkerLinkInput();
        break;
      }
      case 'INVALID':
        this.displayError();
        break;
      default:
        this.displayError();
    }
  };

  private displayError = () =>
    this.setState((): Partial<State> => ({
      error: `That doesn't appear to be a valid project ID or project link.`
    }));

  private handleInput = (field: keyof InputState) => (value: string) =>
    this.setState((): Partial<State> => ({ [field]: value, error: null }));

  private handleEnterKeyPress = watchForEnter<HTMLDivElement>(
    this.handleSubmit
  );

  public render() {
    return (
      <Card sectioned title="Create a watcher">
        <div onKeyPress={this.handleEnterKeyPress}>
          <FormLayout>
            <TextField
              autoFocus
              label="Project ID (required)"
              id="new-watcher-id"
              name="new-watcher-id"
              placeholder="Project ID or 'Preview & Work' link"
              value={this.state.groupIdInput}
              error={this.state.error || false}
              onChange={this.handleInput('groupIdInput')}
              autoComplete={false}
              spellCheck={false}
            />
            <TextField
              label="Title (optional)"
              id="new-watcher-title"
              name="new-watcher-title"
              value={this.state.titleInput}
              onChange={this.handleInput('titleInput')}
              autoComplete={false}
              spellCheck={false}
            />
            <TextField
              label="Description (optional)"
              id="new-watcher-description"
              name="new-watcher-description"
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

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (watcher: Watcher) => dispatch(addWatcher(watcher))
});

export default connect(null, mapDispatch)(CreateWatcherForm);
