import * as React from 'react';
import { SearchOptions } from '../../types';
import { FormLayout, DisplayText, Caption } from '@shopify/polaris';
import {
  MinimumRewardField,
  SearchDelayField,
  SortTypeField,
  QualifiedBox
} from './SearchFields';

const sortingOptions: string[] = [ 'Latest', 'Batch Size', 'Reward' ];

export interface Handlers {
  readonly onChange: (
    field: keyof SearchOptions,
    value: string | boolean
  ) => void;
}

const SearchSettings = (props: SearchOptions & Handlers) => {
  const { delay, minReward, sortType, qualified, onChange } = props;

  const updateField = (field: keyof SearchOptions) => (value: string) => {
    onChange(field, value);
  };

  const toggleField = (field: keyof SearchOptions) => (value: boolean) => {
    onChange(field, value);
  };

  return (
    <FormLayout>
      <DisplayText size="small">Edit search settings.</DisplayText>
      <Caption>
        Changes are saved as you type and will apply on your next search.
      </Caption>
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
      <QualifiedBox onChange={toggleField('qualified')} checked={qualified} />
    </FormLayout>
  );
};

export default SearchSettings;
