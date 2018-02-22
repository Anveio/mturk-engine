import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AddWatcher, addWatcherToFolder } from '../../actions/watcher';
import { Card, FormLayout, TextField, Button } from '@shopify/polaris';
import {
  pandaLinkValidators,
  createWatcherInFolder,
  determineInputType
} from '../../utils/watchers';
import { watchForEnter } from '../../utils/watchForEnter';
import { executeRegex } from '../../utils/parsing';

interface OwnProps {
  readonly folderId: string;
}

interface Handlers {
  readonly onAddWatcher: (groupId: string, folderId: string) => void;
}

interface State {
  readonly value: string;
  readonly error: string | null;
}

class CreateWatcherField extends React.PureComponent<
  OwnProps & Handlers,
  State
> {
  public readonly state: State = {
    value: '',
    error: null
  };

  private static validateInputPandaLink = (input: string): boolean => {
    try {
      return pandaLinkValidators
        .map(fn => fn(input))
        .every((el: boolean) => el === true);
    } catch (e) {
      return false;
    }
  };

  private static parseGroupId = (input: string): string =>
    input.split('groupId=')[1];

  private handleSubmit = () => {
    const input = this.state.value;
    const { onAddWatcher, folderId } = this.props;

    const inputType = determineInputType(input);

    switch (inputType) {
      case 'GROUP_ID':
        onAddWatcher(input, folderId);
        break;
      case 'LEGACY': {
        const valid = CreateWatcherField.validateInputPandaLink(input);
        valid
          ? onAddWatcher(CreateWatcherField.parseGroupId(input), folderId)
          : this.displayError();
        break;
      }
      case 'WORKER':
        {
          try {
            const groupId = executeRegex(input)(/\/projects\/(.*)\/tasks/gi);
            groupId.length === 30
              ? onAddWatcher(groupId, folderId)
              : this.displayError();
          } catch (e) {
            this.displayError();
          }
        }
        break;
      case 'INVALID':
        this.displayError();
        break;
      default:
        this.displayError();
    }
  };

  private displayError = () =>
    this.setState((): Partial<State> => ({
      error: `That doesn't appear to be a valid group ID or pandA link.`
    }));

  private handleInput = (value: string) =>
    this.setState((): Partial<State> => ({ value: value, error: null }));

  private handleEnterKeyPress = watchForEnter<HTMLDivElement>(
    this.handleSubmit
  );

  public render() {
    return (
      <Card sectioned title="Create a watcher">
        <FormLayout>
          <div onKeyPress={this.handleEnterKeyPress}>
            <TextField
              autoFocus
              label="Project ID"
              placeholder="Project ID or 'Preview & Work' link"
              value={this.state.value}
              error={this.state.error || false}
              onChange={this.handleInput}
            />
          </div>
          <Button icon="circlePlus" primary onClick={this.handleSubmit}>
            Add Watcher
          </Button>
        </FormLayout>
      </Card>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (groupId: string, folderId: string) =>
    dispatch(
      addWatcherToFolder(createWatcherInFolder(groupId, folderId), folderId)
    )
});

export default connect(null, mapDispatch)(CreateWatcherField);
