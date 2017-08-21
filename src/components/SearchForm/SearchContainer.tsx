import * as React from 'react';
import { Card, FormLayout, DisplayText, Caption } from '@shopify/polaris';
import { SearchOptions } from '../../types';
import SearchForm from '../../containers/SearchForm';
import SearchButtons from './SearchButtons';

export interface Handlers {
  readonly onToggle: () => void;
  readonly onFetch: (options: SearchOptions) => void;
}

export interface Props {
  readonly active: boolean;
  readonly options: SearchOptions;
}

const SearchOptionsForm = (props: Props & Handlers) => {
  const { active, options, onToggle, onFetch } = props;

  const handleSearch = () => {
    onFetch(options);
  };

  return active ? (
    <Card sectioned>
      <FormLayout>
        <DisplayText size="small">Edit search settings.</DisplayText>
        <Caption>
          Changes are saved as you type and will apply on your next search.
        </Caption>
        <SearchForm />
        <SearchButtons onToggle={onToggle} active onFetch={handleSearch} />
      </FormLayout>
    </Card>
  ) : (
    <Card sectioned>
      <SearchButtons onToggle={onToggle} active={false} onFetch={handleSearch} />
    </Card>
  );
};

export default SearchOptionsForm;
