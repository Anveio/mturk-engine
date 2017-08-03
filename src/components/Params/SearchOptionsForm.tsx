import * as React from 'react';
import { Card, FormLayout } from '@shopify/polaris';
import SearchDelayField from './SearchDelayField';

interface Props {}

const SearchOptionsForm = ({  }: Props) => {
  return (
    <Card sectioned>
      <FormLayout>
        <SearchDelayField />
      </FormLayout>
    </Card>
  );
};

export default SearchOptionsForm;
