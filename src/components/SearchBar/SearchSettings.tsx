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
  readonly onSearch: () => void;
}

export interface Props {
  readonly searchOptions: SearchOptions;
  readonly formActive: boolean;
}

class SearchSettings extends React.PureComponent<Props & Handlers, never> {
  private updateField = (field: keyof SearchOptions) => (value: string) => {
    this.props.onChange(field, value);
  };

  private toggleField = (field: keyof SearchOptions) => (value: boolean) => {
    this.props.onChange(field, value);
  };

  private watchForEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.charCode === 13) {
      event.preventDefault();
      this.props.onSearch();
    }
  };

  public render() {
    const { delay, minReward, sortType, qualified } = this.props.searchOptions;

    return (
      <Collapsible open={this.props.formActive}>
        <Card.Section>
          <div onKeyPress={this.watchForEnter}>
            <FormLayout>
              <DisplayText size="small">Edit search settings.</DisplayText>
              <Caption>
                Changes are saved as you type and will apply on your next
                search.
              </Caption>
              <SearchDelayField
                onChange={this.updateField('delay')}
                value={delay}
              />
              <MinimumRewardField
                onChange={this.updateField('minReward')}
                value={minReward}
              />
              <SortTypeField
                onChange={this.updateField('sortType')}
                value={sortType}
                options={sortingOptions}
              />
              <QualifiedBox
                onChange={this.toggleField('qualified')}
                checked={qualified}
              />
            </FormLayout>
          </div>
        </Card.Section>
      </Collapsible>
    );
  }
}

export default SearchSettings;
