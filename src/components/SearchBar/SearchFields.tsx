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

const SearchDelayField = ({ value, onChange }: Props) => {
  return (
    <TextField
      label="Search Delay"
      type="number"
      suffix="seconds"
      min={10}
      autoComplete={false}
      value={value}
      onChange={onChange}
    />
  );
};

const MinimumRewardField = ({ value, onChange }: Props) => {
  return (
    <TextField
      label="Minimum Reward"
      type="number"
      min={0}
      step={0.1}
      prefix="$"
      autoComplete={false}
      value={value}
      onChange={onChange}
    />
  );
};

const SortTypeField = ({ value, options, onChange }: SortTypeProps) => {
  return (
    <Select
      label="Sort By"
      options={options.map((option: string) => ({
        label: option,
        value: option
      }))}
      value={value}
      onChange={onChange}
    />
  );
};

const QualifiedBox = ({ checked, onChange }: CheckBoxProps) => {
  return (
    <Checkbox label="Qualified only" checked={checked} onChange={onChange} />
  );
};

const CustomSearch = ({ value, onChange }: Props) => {
  return (
    <TextField
      labelHidden
      label="Custom search"
      name="Custom Search"
      id="custom-search"
      placeholder="Custom search"
      value={value}
      onChange={onChange}
    />
  );
};

export {
  SearchDelayField,
  MinimumRewardField,
  SortTypeField,
  QualifiedBox,
  CustomSearch
};
