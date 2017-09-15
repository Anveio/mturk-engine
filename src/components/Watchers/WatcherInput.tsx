import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AddWatcher, addWatcher } from '../../actions/addWatcher';
import { FormLayout, TextField, Button } from '@shopify/polaris';

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

  private handleInput = (value: string) =>
    this.setState((): Partial<State> => ({ value: value }));

  public render() {
    return (
      <FormLayout>
        <TextField
          label="Add watcher"
          labelHidden
          placeholder="Valid pandA link or a groupID of a HIT"
          value={this.state.value}
          error={this.state.error || false}
          onChange={this.handleInput}
        />
        <Button
          icon="circlePlus"
          primary
          onClick={() => this.props.onAddWatcher(this.state.value)}
        >
          Add Watcher
        </Button>
      </FormLayout>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (groupId: string) => dispatch(addWatcher(groupId))
});

export default connect(null, mapDispatch)(WatcherInput);
