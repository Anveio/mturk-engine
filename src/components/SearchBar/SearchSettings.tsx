import * as React from 'react';
import { SearchOptions } from '../../types';
import {
  Collapsible,
  Card,
  FormLayout,
  DisplayText,
  Caption
} from '@shopify/polaris';
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
  readonly onSearch: (options: SearchOptions) => void;
}

export interface Props {
  searchOptions: SearchOptions;
  formActive: boolean;
}

const SearchSettings = (props: Props & Handlers) => {
  const { onChange, onSearch, formActive } = props;
  const { delay, minReward, sortType, qualified } = props.searchOptions;

  const updateField = (field: keyof SearchOptions) => (value: string) => {
    onChange(field, value);
  };

  const watchForEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.charCode === 13) {
      event.preventDefault();
      onSearch(props.searchOptions);
    }
  };

  const toggleField = (field: keyof SearchOptions) => (value: boolean) => {
    onChange(field, value);
  };

  return (
    <Collapsible open={formActive}>
      <Card.Section>
        <div onKeyPress={watchForEnter}>
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
            <QualifiedBox
              onChange={toggleField('qualified')}
              checked={qualified}
            />
          </FormLayout>
        </div>
      </Card.Section>
    </Collapsible>
  );
};

export default SearchSettings;
