import * as React from 'react';
import { SearchOptions } from '../../types';
import { Layout, FormLayout, Stack, Button } from '@shopify/polaris';
import { MinimumRewardField, SearchDelayField, SortTypeField } from './SearchFields';

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
    <Layout sectioned>
      <FormLayout>
        <Stack vertical={false}>
          <SearchDelayField onChange={updateField('delay')} value={delay} />
          <MinimumRewardField
            onChange={updateField('minReward')}
            value={minReward}
          />
          <SortTypeField
            onChange={updateField('sortType')}
            value={sortType}
            options={sortingOptions}
          />
        </Stack>
        <Button plain>Hide form</Button>
      </FormLayout>
    </Layout>
  );
};

export default SearchOptionsForm;
