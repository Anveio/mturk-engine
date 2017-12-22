import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../types';
import { Layout, SettingToggle, TextStyle } from '@shopify/polaris';
import {
  toggleLegacyLinks,
  ToggleLegacyLinks
} from '../../actions/updateValue';

interface Props {
  readonly value: boolean;
}

interface Handlers {
  readonly onChange: () => void;
}

class LegacyLinksSettingToggle extends React.PureComponent<Props & Handlers> {
  private static calculateBodyContent = (active: boolean) =>
    active ? (
      <TextStyle variation="strong">Legacy</TextStyle>
    ) : (
      <TextStyle variation="strong">Worker</TextStyle>
    );

  private static calculateButtonContent = (active: boolean) =>
    active ? 'Disable' : 'Enable';

  public render() {
    const { value, onChange } = this.props;
    const {
      calculateBodyContent,
      calculateButtonContent
    } = LegacyLinksSettingToggle;

    return (
      <Layout.AnnotatedSection
        title="Use legacy Mturk website"
        description="Links to Mechanical Turk can point to the old website or the new one."
      >
        <SettingToggle
          action={{
            content: calculateButtonContent(value),
            onAction: () => onChange()
          }}
          enabled={value}
        >
          Links will take you to the {calculateBodyContent(value)} site.
        </SettingToggle>
      </Layout.AnnotatedSection>
    );
  }
}

const mapState = (state: RootState): Props => ({
  value: state.legacyLinksEnabled
});

const mapDispatch = (dispatch: Dispatch<ToggleLegacyLinks>): Handlers => ({
  onChange: () => {
    dispatch(toggleLegacyLinks());
  }
});

export default connect(mapState, mapDispatch)(LegacyLinksSettingToggle);
