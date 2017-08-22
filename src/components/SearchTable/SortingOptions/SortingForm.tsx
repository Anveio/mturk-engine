import * as React from 'react';
import { Card, Select } from '@shopify/polaris';
import { SortingOption } from '../../../types';

interface Props {
  value: SortingOption;
  onChange: (option: SortingOption) => void;
}

const SortingForm = ({ value, onChange }: Props) => {
  return (
    <Card.Section>
      <Select
        label="Sorting Options"
        id="select-sort-option"
        name="Sorting Options"
        options={[ 'Reward', 'Batch Size' ]}
        value={value}
        onChange={onChange}
      />
    </Card.Section>
  );
};

export default SortingForm;
