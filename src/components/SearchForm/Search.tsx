import * as React from 'react';
import { Layout, FormLayout, DisplayText, Caption } from '@shopify/polaris';
import SearchForm from '../../containers/SearchForm';
import SearchButtons from './SearchButtons';

export interface Handlers {
  readonly onToggle: () => void;
}

export interface Props {
  readonly active: boolean;
}

const SearchOptionsForm = (props: Props & Handlers) => {
  const { active, onToggle } = props;

  return active ? (
    <Layout sectioned>
      <FormLayout>
        <DisplayText size="small">Edit search settings.</DisplayText>
        <Caption>
          Changes are saved in real time and will apply on your next search.
        </Caption>
        <SearchForm />
        <SearchButtons onToggle={onToggle} active />
      </FormLayout>
    </Layout>
  ) : (
    <SearchButtons onToggle={onToggle} active={false} />
  );
};

export default SearchOptionsForm;
