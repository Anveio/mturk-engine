import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions, SortingOption } from '../../types';
import { FormUpdate, updateForm } from '../../actions/form';
import { TextField, Select } from '@shopify/polaris';

interface Props {
  readonly value: string;
}

interface Handlers {
  readonly onChange: (value: string | number) => void;
}

interface State {
  readonly value: string;
  readonly error: string | null;
}

const createMapDispatchFn = (field: keyof SearchOptions) => (
  dispatch: Dispatch<FormUpdate<SearchOptions>>
): Handlers => ({
  onChange: (value: string | boolean | number) => {
    dispatch(updateForm<SearchOptions>('searchOptions', field, value));
  }
});

const createMapStateFn = (field: keyof SearchOptions) => (
  state: RootState
) => ({
  value: state.searchOptions[field]
});

class SearchDelayField extends React.PureComponent<Props & Handlers, State> {
  constructor(props: Props & Handlers) {
    super(props);
    this.state = {
      error: null,
      value: props.value.toString()
    };
  }

  private handleChange = (value: string) => {
    this.setState({ value, error: null });
    this.setErrorIfAny(value);
    const parsedValue = +value;
    if (!Number.isNaN(parsedValue)) {
      this.props.onChange(parsedValue);
    }
  };

  private setErrorIfAny = (value: string) => {
    if (+value < 0) {
      this.setState({
        error: `Time between searches can't be negative.`
      });
    }
  };

  public render() {
    return (
      <TextField
        label="Time Between Searches"
        type="number"
        suffix="seconds"
        autoComplete={false}
        spellCheck={false}
        value={this.state.value}
        onChange={this.handleChange}
        error={this.state.error || false}
      />
    );
  }
}

class MinimumRewardField extends React.PureComponent<Props & Handlers, State> {
  constructor(props: Props & Handlers) {
    super(props);
    this.state = {
      error: null,
      value: props.value.toString()
    };
  }

  private handleChange = (value: string) => {
    this.setState({ value, error: null });
    const parsedValue = +value;
    if (!Number.isNaN(parsedValue)) {
      this.props.onChange(parsedValue);
    }
  };

  public render() {
    return (
      <TextField
        label="Minimum Reward"
        type="number"
        step={0.1}
        prefix="$"
        autoComplete={false}
        spellCheck={false}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

interface SortDropdownOptions {
  readonly label: SortingOption;
  readonly value: SortingOption;
}

class SortTypeField extends React.PureComponent<Props & Handlers, never> {
  private static options: SortDropdownOptions[] = [
    {
      label: 'Latest',
      value: 'Latest'
    },
    {
      label: 'Batch Size',
      value: 'Batch Size'
    },
    {
      label: 'Reward',
      value: 'Reward'
    }
  ];

  public render() {
    return (
      <Select
        label="Search By"
        options={SortTypeField.options}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class CustomSearch extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <TextField
        label="Search Term"
        name="search-term"
        id="search-term"
        placeholder="Title, requester name, keywords, etc."
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

const ConnectedSearchDelayField = connect(
  createMapStateFn('delay'),
  createMapDispatchFn('delay')
)(SearchDelayField);

const ConnectedMinRewardField = connect(
  createMapStateFn('minReward'),
  createMapDispatchFn('minReward')
)(MinimumRewardField);

const ConnectedSortTypeField = connect(
  createMapStateFn('sortType'),
  createMapDispatchFn('sortType')
)(SortTypeField);

const ConnectedCustomSearchField = connect(
  createMapStateFn('searchTerm'),
  createMapDispatchFn('searchTerm')
)(CustomSearch);

export {
  ConnectedSearchDelayField,
  ConnectedMinRewardField,
  ConnectedSortTypeField,
  ConnectedCustomSearchField
};
