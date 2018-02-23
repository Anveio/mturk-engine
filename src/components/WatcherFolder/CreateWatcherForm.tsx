import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AddWatcher, addWatcher } from '../../actions/watcher';
import { Card, FormLayout, TextField, Button } from '@shopify/polaris';
import {
  determineInputType,
  parseProjectIdFromProjectLink,
  parseGroupId
} from '../../utils/watchers';
import { watchForEnter } from '../../utils/watchForEnter';
import { Watcher, RootState, WatcherMap } from '../../types';
import {
  validateInputPandaLink,
  validateProjectIdLink
} from '../../utils/validation';
import { normalizedWatchers } from '../../selectors/watchers';

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
  readonly helpText: string | null;
  readonly error: string | null;
}

type State = InputState & ErrorState;

class CreateWatcherForm extends React.PureComponent<
  Props & OwnProps & Handlers,
  State
> {
  public readonly state: State = {
    groupIdInput: '',
    titleInput: '',
    descriptionInput: '',
    error: null,
    helpText: null
  };

  private createWatcher = (groupId: string, folderId: string): Watcher => ({
    groupId: groupId,
    delay: 5,
    description: this.state.descriptionInput,
    folderId: folderId,
    title: this.state.titleInput || groupId,
    createdOn: new Date(),
    stopAfterFirstSuccess: true
  });

  private confirmSubmit = (id: string, valid: boolean) => {
    if (!valid) {
      this.displayError();
      return;
    }

    this.props.onAddWatcher(this.createWatcher(id, this.props.folderId));
  };

  private handleSubmit = () => {
    const { onAddWatcher, folderId } = this.props;
    const { groupIdInput } = this.state;
    const inputType = determineInputType(groupIdInput);

    switch (inputType) {
      case 'GROUP_ID':
        onAddWatcher(this.createWatcher(groupIdInput, folderId));
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
      <Card sectioned title="Create a watcher in this folder">
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

const mapState = (state: RootState): Props => ({
  watchers: normalizedWatchers(state)
});

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (watcher: Watcher) => dispatch(addWatcher(watcher))
});

export default connect(mapState, mapDispatch)(CreateWatcherForm);
