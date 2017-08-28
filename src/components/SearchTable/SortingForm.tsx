import * as React from 'react';
import { Card, Select } from '@shopify/polaris';
import { SortingOption } from '../../types';

export interface Props {
  readonly value: SortingOption;
}

export interface Handlers {
  readonly onChange: (option: SortingOption) => void;
}

const options: SortingOption[] = [ 'Reward', 'Batch Size', 'Latest' ];

const SortingForm = ({ value, onChange }: Props & Handlers) => {
  return (
    <Card.Section>
      <Select
        label="Sorting Options"
        id="select-sort-option"
        name="Sorting Options"
        options={options}
        value={value}
        onChange={onChange}
      />
    </Card.Section>
  );
};

export default SortingForm;
