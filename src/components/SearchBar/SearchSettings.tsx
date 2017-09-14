import * as React from 'react';
import {
  Collapsible,
  Card,
  FormLayout,
  DisplayText,
  Caption
} from '@shopify/polaris';
import {
  ConnectedMinRewardField,
  ConnectedSearchDelayField,
  ConnectedSortTypeField,
  ConnectedCustomSearchField
} from './SearchFields';
import ConnectedQualifiedBox from './QualifiedCheckBox';

export interface Handlers {
  readonly onSearch: () => void;
}

export interface Props {
  readonly formActive: boolean;
}

class SearchSettings extends React.PureComponent<Props & Handlers, never> {
  private watchForEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.charCode === 13) {
      event.preventDefault();
      this.props.onSearch();
    }
  };

  public render() {
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
              <ConnectedSearchDelayField />
              <ConnectedMinRewardField />
              <ConnectedCustomSearchField />
              <ConnectedSortTypeField />
              <ConnectedQualifiedBox />
            </FormLayout>
          </div>
        </Card.Section>
      </Collapsible>
    );
  }
}

export default SearchSettings;
