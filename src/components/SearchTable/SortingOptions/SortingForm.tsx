import * as React from 'react';
import { Card, Select } from '@shopify/polaris';

export interface AppProps {}

const SortingForm = (props: AppProps) => {
  return (
    <Card.Section>
      <Select name="Sorting Options" options={[]} label="Sorting Options" />
    </Card.Section>
  );
};

export default SortingForm;
