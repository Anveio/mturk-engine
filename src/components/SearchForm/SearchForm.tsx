import * as React from 'react';
import { Card, FormLayout, TextField, Select } from '@shopify/polaris';

interface Props {}

type Option =
  | string
  | {
      value: string;
      label: string;
      disabled?: boolean;
    };

const sortingOptions: Option[] = [ 'Latest', 'Batch Size', 'Reward' ];

const SearchOptionsForm = ({  }: Props) => {
  return (
    <Card sectioned title="Edit Search Options">
      <FormLayout>
        <TextField label="Search Delay" type="number" autoComplete={false} />
        <TextField label="Minimum Reward" type="number" autoComplete={false} />
        <Select label="Sort By" options={sortingOptions} />
      </FormLayout>
    </Card>
  );
};

export default SearchOptionsForm;
