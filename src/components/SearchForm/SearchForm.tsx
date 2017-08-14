import * as React from 'react';
import { SearchOptions } from '../../types';
import { Card, FormLayout, Stack, Button } from '@shopify/polaris';
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
    <Card title="Edit Search Settings" sectioned>
      <Stack>
        <FormLayout>
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
          <Button icon="circleCancel" onClick={onToggle}>
            Hide search settings
          </Button>
        </FormLayout>
      </Stack>
    </Card>
  ) : (
    <Button onClick={onToggle}>Edit search settings</Button>
  );
};

export default SearchOptionsForm;
