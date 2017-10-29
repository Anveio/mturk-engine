import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Button,
  Card,
  FormLayout,
  DisplayText,
  Caption
} from '@shopify/polaris';
import { Popover, Position } from '@blueprintjs/core';
import { SearchAction, searchRequestSingular } from '../../actions/search';
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

class SearchSettings extends React.PureComponent<Handlers, never> {
  private watchForEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.charCode === 13) {
      event.preventDefault();
      this.props.onSearch();
    }
  };

  public render() {
    return (
      <Popover position={Position.BOTTOM} canEscapeKeyClose={true}>
        <Button disclosure>Search Settings</Button>
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
      </Popover>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<SearchAction>): Handlers => ({
  onSearch: () => {
    dispatch(searchRequestSingular());
  }
});

export default connect(null, mapDispatch)(SearchSettings);
