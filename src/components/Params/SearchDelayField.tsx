import * as React from 'react';
import { TextField } from '@shopify/polaris';

interface State {
  text: string;
}

class SearchDelayField extends React.PureComponent<{}, State> {
  state = {
    text: ''
  };

  onChange = (value: string): void => {
    this.setState((prevState: State): Partial<State> => {
      return {
        text: prevState.text.concat(value)
      };
    });
  };

  render() {
    return (
      <TextField
        label="Search Delay"
        id="search-delay"
        helpText="Controls the time between refreshes of the latest HITs."
        placeholder="Minimum 1 second."
        onChange={this.onChange}
        min={1}
        value={this.state.text}
      />
    );
  }
}

export default SearchDelayField;
