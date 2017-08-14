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
}

export interface Props extends SearchOptions {
  active: boolean;
}

const SearchOptionsForm = (props: Props & Handlers) => {
  const { delay, minReward, onChange, sortType, qualified } = props;

  const updateField = (field: keyof SearchOptions) => (value: string) => {
    onChange(field, value);
  };

  const toggleField = (field: keyof SearchOptions) => (value: boolean) => {
    onChange(field, value);
  };

  return (
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
          <Button icon="circleCancel">Hide Search Settings</Button>
        </FormLayout>
      </Stack>
    </Card>
  );
};

export default SearchOptionsForm;
