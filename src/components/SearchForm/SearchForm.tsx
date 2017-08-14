import * as React from 'react';
import { SearchOptions } from '../../types';
import { Layout, FormLayout, DisplayText, Caption, Button } from '@shopify/polaris';
import {
  MinimumRewardField,
  SearchDelayField,
  SortTypeField,
  QualifiedBox
} from './SearchFields';

const sortingOptions: string[] = [ 'Latest', 'Batch Size', 'Reward' ];

export interface Handlers {
  readonly onChange: (field: keyof SearchOptions, value: string | boolean) => void;
  readonly onToggle: () => void;
}

export interface Props extends SearchOptions {
  active: boolean;
}

const SearchOptionsForm = (props: Props & Handlers) => {
  const {
    active,
    delay,
    minReward,
    sortType,
    qualified,
    onChange,
    onToggle
  } = props;

  const updateField = (field: keyof SearchOptions) => (value: string) => {
    onChange(field, value);
  };

  const toggleField = (field: keyof SearchOptions) => (value: boolean) => {
    onChange(field, value);
  };

  return active ? (
    <Layout sectioned>
      <FormLayout>
        <DisplayText size="small">Edit search settings.</DisplayText>
        <Caption>
          Changes are saved in real time and will apply on your next search.
        </Caption>
        <SearchDelayField onChange={updateField('delay')} value={delay} />
        <MinimumRewardField onChange={updateField('minReward')} value={minReward} />
        <SortTypeField
          onChange={updateField('sortType')}
          value={sortType}
          options={sortingOptions}
        />
        <QualifiedBox onChange={toggleField('qualified')} checked={qualified} />
        <Button icon="circleCancel" onClick={onToggle}>
          Hide search settings
        </Button>
      </FormLayout>
    </Layout>
  ) : (
    <Button onClick={onToggle}>Edit search settings</Button>
  );
};

export default SearchOptionsForm;
