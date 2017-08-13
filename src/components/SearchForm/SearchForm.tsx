import * as React from 'react';
import { SearchOptions } from '../../types';
import { Card, FormLayout, TextField, Select } from '@shopify/polaris';

const sortingOptions: string[] = [ 'Latest', 'Batch Size', 'Reward' ];

export interface Handlers {
  readonly onChange: (field: keyof SearchOptions, value: string) => void;
}

const SearchOptionsForm = (props: SearchOptions & Handlers) => {
  const { delay, minReward, onChange, sortType } = props;

  const updateField = (field: keyof SearchOptions) => (value: string) => {
    onChange(field, value);
  };

  return (
    <Card sectioned title="Edit Search Options">
      <FormLayout>
        <TextField
          label="Search Delay"
          type="number"
          autoComplete={false}
          value={delay}
          onChange={updateField('delay')}
        />
        <TextField
          label="Minimum Reward"
          type="number"
          autoComplete={false}
          value={minReward}
          onChange={updateField('minReward')}
        />
        <Select
          label="Sort By"
          options={sortingOptions}
          value={sortType}
          onChange={updateField('sortType')}
        />
      </FormLayout>
    </Card>
  );
};

export default SearchOptionsForm;
