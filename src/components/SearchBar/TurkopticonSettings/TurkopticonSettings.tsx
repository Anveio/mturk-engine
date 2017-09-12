import * as React from 'react';
import {
  Collapsible,
  Card,
  FormLayout,
  Stack,
  DisplayText
} from '@shopify/polaris';
import {
  ConnectedCommWeightField,
  ConnectedFastWeightField,
  ConnectedFairWeightField,
  ConnectedPayWeightField
} from './TOWeightFields';

export interface Props {
  readonly formActive: boolean;
}

class SearchSettings extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Collapsible open={this.props.formActive}>
        <Card.Section>
          <DisplayText size="small">Edit Turkopticon settings.</DisplayText>
          <Stack vertical>
            <FormLayout>
              <ConnectedCommWeightField />
              <ConnectedFastWeightField />
              <ConnectedFairWeightField />
              <ConnectedPayWeightField />
            </FormLayout>
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

export default SearchSettings;
