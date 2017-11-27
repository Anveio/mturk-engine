import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button } from '@shopify/polaris';
import { ReadPersistedState, readPersistedState } from '../../actions/backup';

export interface Props {}

export interface Handlers {
  readonly onExport: () => void;
}

class ExportUserSettings extends React.Component<Props & Handlers, never> {
  public render() {
    return (
      <Button icon="save" onClick={this.props.onExport}>
        Export
      </Button>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<ReadPersistedState>): Handlers => ({
  onExport: () => dispatch(readPersistedState())
});

export default connect(null, mapDispatch)(ExportUserSettings);
