import * as React from 'react';
import { Layout, Card } from '@shopify/polaris';
import EditVolume from './EditVolume';
import ToggleAudio from './ToggleAudio';

class AudioSettings extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Layout.AnnotatedSection
        title="Enable Audio"
        description={`Sounds will play for various events. E.g. finding a new 
          HIT.`}
      >
        <Card>
          <ToggleAudio />
          <Card.Section>
            <EditVolume />
          </Card.Section>
        </Card>
      </Layout.AnnotatedSection>
    );
  }
}

export default AudioSettings;
