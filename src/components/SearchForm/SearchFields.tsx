import * as React from 'react';
import { TextField, Select, Checkbox } from '@shopify/polaris';

interface Props {
  readonly onChange: (value: string) => void;
}

interface TextFieldProps extends Props {
  readonly value: string;
}

interface SortTypeProps extends Props {
  readonly options: string[];
  readonly value: string;
}

interface CheckBoxProps {
  readonly onChange: (value: boolean) => void;
  readonly checked: boolean;
}

const SearchDelayField = ({ value, onChange }: TextFieldProps) => {
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

const MinimumRewardField = ({ value, onChange }: TextFieldProps) => {
  return (
    <TextField
      label="Minimum Reward"
      type="number"
      prefix="$"
      autoComplete={false}
      value={value}
      onChange={onChange}
    />
  );
};

const SortTypeField = ({ options, onChange }: SortTypeProps) => {
  return (
    <Select
      label="Sort By"
      options={options.map((option: string) => ({
        label: option,
        value: option
      }))}
      onChange={onChange}
    />
  );
};

const QualifiedBox = ({ checked, onChange }: CheckBoxProps) => {
  return <Checkbox label="Qualified only" checked={checked} onChange={onChange} />;
};

export { SearchDelayField, MinimumRewardField, SortTypeField, QualifiedBox };
