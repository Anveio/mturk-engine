import * as React from 'react';
import {
  Layout,
  Card,
  FormLayout,
  TextContainer
  // DisplayText
} from '@shopify/polaris';
import {
  ConnectedCommWeightField,
  ConnectedFastWeightField,
  ConnectedFairWeightField,
  ConnectedPayWeightField
} from './TOWeightFields';

class TurkopticonWeightForm extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Layout.AnnotatedSection
        title="Edit Turkopticon attribute score weights"
        // tslint:disable-next-line:max-line-length
        description={
          'A higher number means that trait will matter more when calculating the average T.O. of a requester.'
        }
      >
        <Card sectioned title="Attribute score weights">
          <FormLayout>
            <FormLayout.Group condensed>
              <ConnectedFairWeightField />
              <ConnectedPayWeightField />
              <ConnectedCommWeightField />
              <ConnectedFastWeightField />
            </FormLayout.Group>
            <TextContainer>
              Weights with a value of 0 will be ignored when calculating
              averages.
            </TextContainer>
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
    );
  }
}

export default TurkopticonWeightForm;
