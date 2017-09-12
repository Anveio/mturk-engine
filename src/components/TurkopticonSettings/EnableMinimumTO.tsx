import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, TOpticonSettings } from '../../types';
import { FormUpdate, updateForm } from '../../actions/form';
import { Layout, Card, SettingToggle, TextStyle } from '@shopify/polaris';

import EditMinTO from './EditMinTO';

interface Props {
  readonly value: boolean;
}

interface Handlers {
  readonly onChange: (value: boolean) => void;
}

class EnableMinimumTO extends React.PureComponent<Props & Handlers> {
  static calculateButtonContent = (active: boolean) =>
    active ? 'Disable' : 'Enable';

  static calculateBodyContent = (active: boolean) =>
    active ? '' : <TextStyle variation="strong">not</TextStyle>;

  public render() {
    const { value, onChange } = this.props;

    return (
      <Layout.AnnotatedSection
        title="Enable Turkopticon Filtering"
        description="You can hide HITs by requesters that fall below a certain score or from requesters that have no score."
      >
        <Card>
          <SettingToggle
            action={{
              content: EnableMinimumTO.calculateButtonContent(value),
              onAction: () => onChange(!value)
            }}
            enabled={value}
          >
            Requesters below the minimum T.O score are{' '}
            {EnableMinimumTO.calculateBodyContent(value)} being hidden.
          </SettingToggle>
          <Card.Section>
            <EditMinTO />
          </Card.Section>
        </Card>
      </Layout.AnnotatedSection>
    );
  }
}

const mapState = (state: RootState): Props => ({
  value: state.topticonSettings.hideBelowThresholdEnabled
});

const mapDispatch = (
  dispatch: Dispatch<FormUpdate<TOpticonSettings>>
): Handlers => ({
  onChange: (value: boolean) => {
    dispatch(
      updateForm<TOpticonSettings>(
        'topticonSettings',
        'hideBelowThresholdEnabled',
        value
      )
    );
  }
});

export default connect(mapState, mapDispatch)(EnableMinimumTO);
