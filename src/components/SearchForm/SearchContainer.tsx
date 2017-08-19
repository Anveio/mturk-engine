import * as React from 'react';
import { Card, FormLayout, DisplayText, Caption } from '@shopify/polaris';
import SearchForm from '../../containers/SearchForm';
import SearchButtons from './SearchButtons';

export interface Handlers {
  readonly onToggle: () => void;
}

export interface Props {
  readonly active: boolean;
}

const SearchOptionsForm = ({ active, onToggle }: Props & Handlers) => {
  return active ? (
    <Card sectioned>
      <FormLayout>
        <DisplayText size="small">Edit search settings.</DisplayText>
        <Caption>
          Changes are saved as you type and will apply on your next search.
        </Caption>
        <SearchForm />
        <SearchButtons onToggle={onToggle} active />
      </FormLayout>
    </Card>
  ) : (
    <SearchButtons onToggle={onToggle} active={false} />
  );
};

export default SearchOptionsForm;
