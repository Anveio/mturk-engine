import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions, SortingOption } from '../../types';
import { FormAction, updateForm } from '../../actions/form';
import { TextField, Select } from '@shopify/polaris';

interface Props {
  readonly value: string;
}

interface Handlers {
  readonly onChange: (value: string) => void;
}

const createMapDispatchFn = (field: keyof SearchOptions) => (
  dispatch: Dispatch<FormAction<SearchOptions>>
): Handlers => ({
  onChange: (value: string | boolean) => {
    dispatch(updateForm<SearchOptions>('searchOptions', field, value));
  }
});

const createMapStateFn = (field: keyof SearchOptions) => (
  state: RootState
) => ({
  value: state.searchOptions[field]
});

class SearchDelayField extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <TextField
        label="Time Between Searches"
        type="number"
        suffix="seconds"
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class MinimumRewardField extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <TextField
        label="Minimum Reward"
        type="number"
        step={0.1}
        prefix="$"
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class SortTypeField extends React.PureComponent<Props & Handlers, never> {
  static options: SortingOption[] = [ 'Latest', 'Batch Size', 'Reward' ];

  public render() {
    return (
      <Select
        label="Search By"
        options={SortTypeField.options.map((option: string) => ({
          label: option,
          value: option
        }))}
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
        labelHidden
        label="Custom search"
        name="Custom Search"
        id="custom-search"
        placeholder="Custom search"
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

export {
  ConnectedSearchDelayField,
  ConnectedMinRewardField,
  ConnectedSortTypeField,
  CustomSearch
};
