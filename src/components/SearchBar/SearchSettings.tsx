import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Card, FormLayout, Caption } from '@shopify/polaris';
import { Popover, Position } from '@blueprintjs/core';
import { searchRequestSingular } from '../../actions/search';
import {
  ConnectedMinRewardField,
  ConnectedSearchDelayField,
  ConnectedSortTypeField
} from './SearchFields';
import ConnectedQualifiedBox from './QualifiedCheckBox';
import { watchForEnter } from '../../utils/watchForEnter';

interface Handlers {
  readonly onSearch: () => void;
}

class SearchSettings extends React.PureComponent<Handlers, never> {
  private onEnter = watchForEnter<HTMLDivElement>(this.props.onSearch);

  public render() {
    return (
      <Popover position={Position.BOTTOM} canEscapeKeyClose={true}>
        <Button disclosure>Settings</Button>
        <Card title="Edit search settings">
          <Card.Section>
            <div onKeyPress={this.onEnter}>
              <FormLayout>
                <ConnectedSearchDelayField />
                <ConnectedMinRewardField />
                <ConnectedSortTypeField />
                <ConnectedQualifiedBox />
              </FormLayout>
            </div>
          </Card.Section>
          <Card.Section subdued>
            <Caption>
              Changes are saved as you type and will apply on your next search.
            </Caption>
          </Card.Section>
        </Card>
      </Popover>
    );
  }
}

const mapDispatch: Handlers = {
  onSearch: searchRequestSingular
};

export default connect(
  null,
  mapDispatch
)(SearchSettings);
