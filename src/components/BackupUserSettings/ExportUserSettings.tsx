import * as React from 'react';
import { connect } from 'react-redux';
import { Stack, Button, TextContainer } from '@shopify/polaris';
import { readPersistedState } from '../../actions/backup';

interface Handlers {
  readonly onExport: () => void;
}

class ExportUserSettings extends React.Component<Handlers, never> {
  public render() {
    return (
      <Stack alignment="baseline">
        <Button primary icon="save" onClick={this.props.onExport}>
          Save Backup
        </Button>
        <TextContainer>
          Download all of your data in a single, glorious file.
        </TextContainer>
      </Stack>
    );
  }
}

const mapDispatch: Handlers = {
  onExport: readPersistedState
};

export default connect(null, mapDispatch)(ExportUserSettings);
