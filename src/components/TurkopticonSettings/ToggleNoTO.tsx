import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, TOpticonSettings } from '../../types';
import { FormUpdate, updateForm } from '../../actions/form';
import {
  Layout,
  SettingToggle,
  Stack,
  TextContainer,
  TextStyle
} from '@shopify/polaris';

interface Props {
  readonly value: boolean;
}

interface Handlers {
  readonly onChange: (value: boolean) => void;
}

class ToggleNoTO extends React.PureComponent<Props & Handlers> {
  private static calculateButtonContent = (active: boolean) =>
    active ? 'Disable' : 'Enable';

  private static calculateBodyContent = (active: boolean) =>
    active ? '' : <TextStyle variation="strong">not</TextStyle>;

  public render() {
    const { value, onChange } = this.props;

    return (
      <Layout.AnnotatedSection
        title="Hide requesters with no Turkopticon score"
        description="Turning this setting on will hide HITs from requesters that have no Turkopticon reviews."
      >
        <SettingToggle
          action={{
            content: ToggleNoTO.calculateButtonContent(value),
            onAction: () => onChange(!value)
          }}
          enabled={value}
        >
          <Stack vertical>
            <TextContainer>
              Requesters that have no T.O. score are{' '}
              {ToggleNoTO.calculateBodyContent(value)} being hidden.
            </TextContainer>
            <TextContainer>
              Enabling this setting will mean search results are not displayed
              until data is retrieved from Turkopticon.
            </TextContainer>
          </Stack>
        </SettingToggle>
      </Layout.AnnotatedSection>
    );
  }
}

const mapState = (state: RootState): Props => ({
  value: state.topticonSettings.hideNoToEnabled
});

const mapDispatch = (
  dispatch: Dispatch<FormUpdate<TOpticonSettings>>
): Handlers => ({
  onChange: (value: boolean) => {
    dispatch(
      updateForm<TOpticonSettings>('topticonSettings', 'hideNoToEnabled', value)
    );
  }
});

export default connect(mapState, mapDispatch)(ToggleNoTO);
