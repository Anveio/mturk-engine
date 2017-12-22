import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AddWatcher, addWatcher } from '../../actions/watcher';
import { Card, FormLayout, TextField, Button } from '@shopify/polaris';
import {
  pandaLinkValidators,
  watcherFromId,
  determineInputType
} from '../../utils/watchers';
import { watchForEnter } from '../../utils/watchForEnter';
import { executeRegex } from '../../utils/parsing';

export interface Handlers {
  readonly onAddWatcher: (groupId: string) => void;
}

export interface State {
  readonly value: string;
  readonly error: string | null;
}

class WatcherInput extends React.PureComponent<Handlers, State> {
  state = {
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
    const { onAddWatcher } = this.props;

    const inputType = determineInputType(input);

    switch (inputType) {
      case 'GROUP_ID':
        onAddWatcher(input);
        break;
      case 'LEGACY': {
        const valid = WatcherInput.validateInputPandaLink(input);
        valid
          ? onAddWatcher(WatcherInput.parseGroupId(input))
          : this.displayError();
        break;
      }
      case 'WORKER':
        {
          try {
            const groupId = executeRegex(input)(/\/projects\/(.*)\/tasks/gi);
            groupId.length === 30 ? onAddWatcher(groupId) : this.displayError();
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
      <Card sectioned subdued>
        <FormLayout>
          <div onKeyPress={this.handleEnterKeyPress}>
            <TextField
              autoFocus
              label="Add watcher"
              labelHidden
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
  onAddWatcher: (groupId: string) =>
    dispatch(addWatcher(watcherFromId(groupId)))
});

export default connect(null, mapDispatch)(WatcherInput);
