import * as React from 'react';
import { TextField } from '@shopify/polaris';

export interface Props {}

export interface State {
  readonly value: string;
  readonly error: string | null;
}

class WatcherInput extends React.PureComponent<Props, State> {
  state = {
    value: '',
    error: null
  };

  private handleInput = (value: string) =>
    this.setState((): Partial<State> => ({ value: value }));

  public render() {
    return (
      <TextField
        label="Add watcher"
        value={this.state.value}
        error={this.state.error || false}
        onChange={this.handleInput}
      />
    );
  }
}

export default WatcherInput;
