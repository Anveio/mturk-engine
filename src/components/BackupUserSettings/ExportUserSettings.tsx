import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Stack, Button, TextContainer } from '@shopify/polaris';
import { ReadPersistedState, readPersistedState } from '../../actions/backup';

export interface Props {}

export interface Handlers {
  readonly onExport: () => void;
}

class ExportUserSettings extends React.Component<Props & Handlers, never> {
  public render() {
    return (
      <Stack>
        <Button icon="save" onClick={this.props.onExport}>
          Save Backup
        </Button>
        <TextContainer>
          Download all of your data, including your blocked HITs and your HIT
          database, in a single file. You can share your backup across different
          devices and browsers.
        </TextContainer>
      </Stack>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<ReadPersistedState>): Handlers => ({
  onExport: () => dispatch(readPersistedState())
});

export default connect(null, mapDispatch)(ExportUserSettings);
