import * as React from 'react';
import {
  Layout,
  Card,
  FormLayout
  // Stack,
  // DisplayText
} from '@shopify/polaris';
import {
  ConnectedCommWeightField,
  ConnectedFastWeightField,
  ConnectedFairWeightField,
  ConnectedPayWeightField
} from './TOWeightFields';

class TurkopticonWeightForm extends React.PureComponent<{}, never> {
  static scoreWeightDescription = 'A higher number given to a trait means that trait will matter more when calculating the average T.O. of a requester.';

  public render() {
    return (
      <Layout.AnnotatedSection
        title="Edit Turkopticon score weights"
        description={TurkopticonWeightForm.scoreWeightDescription}
      >
        <Card sectioned title="Edit weights of Turkopticon requester traits">
          <FormLayout>
            <ConnectedCommWeightField />
            <ConnectedFastWeightField />
            <ConnectedFairWeightField />
            <ConnectedPayWeightField />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
    );
  }
}

export default TurkopticonWeightForm;
