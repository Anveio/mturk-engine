import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Stack, Button, TextContainer } from '@shopify/polaris';
import { ReadPersistedState, readPersistedState } from '../../actions/backup';

export interface Handlers {
  readonly onExport: () => void;
}

class ExportUserSettings extends React.Component<Handlers, never> {
  public render() {
    return (
      <Stack alignment="baseline">
        <Button icon="save" onClick={this.props.onExport}>
          Save Backup
        </Button>
        <TextContainer>
          Download all of your data in a single, glorious file.
        </TextContainer>
      </Stack>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<ReadPersistedState>): Handlers => ({
  onExport: () => dispatch(readPersistedState())
});

export default connect(null, mapDispatch)(ExportUserSettings);
