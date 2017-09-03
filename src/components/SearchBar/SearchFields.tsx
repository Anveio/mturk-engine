import * as React from 'react';
import { TextField, Select, Checkbox } from '@shopify/polaris';

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

interface SortTypeProps extends Props {
  readonly options: string[];
}

interface CheckBoxProps {
  readonly onChange: (value: boolean) => void;
  readonly checked: boolean;
}

class SearchDelayField extends React.PureComponent<Props, never> {
  public render() {
    return (
      <TextField
        label="Time Between Searches"
        type="number"
        suffix="seconds"
        min={10}
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class MinimumRewardField extends React.PureComponent<Props, never> {
  public render() {
    return (
      <TextField
        label="Minimum Reward"
        type="number"
        min={0}
        step={0.1}
        prefix="$"
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class SortTypeField extends React.PureComponent<SortTypeProps, never> {
  public render() {
    return (
      <Select
        label="Search By"
        options={this.props.options.map((option: string) => ({
          label: option,
          value: option
        }))}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class QualifiedBox extends React.PureComponent<CheckBoxProps, never> {
  public render() {
    return (
      <Checkbox
        label="Qualified only"
        id="checkbox-qualified"
        name="Qualfiied Only Checkbox"
        checked={this.props.checked}
        onChange={this.props.onChange}
      />
    );
  }
}

class CustomSearch extends React.PureComponent<Props, never> {
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

export {
  SearchDelayField,
  MinimumRewardField,
  SortTypeField,
  QualifiedBox,
  CustomSearch
};
