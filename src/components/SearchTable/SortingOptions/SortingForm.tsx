import * as React from 'react';
import { Card, Select } from '@shopify/polaris';
import { SortingOption } from '../../../types';

interface Props {
  value: SortingOption;
  onChange: (option: SortingOption) => void;
}

const options: SortingOption[] = [ 'Reward', 'Batch Size', 'Latest' ];

const SortingForm = ({ value, onChange }: Props) => {
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
