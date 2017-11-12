import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ReadPersistedState, readPersistedState } from '../../actions/backup';

export interface Props {}

export interface Handlers {
  readonly onExport: () => void;
}

class ExportUserSettings extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <div className="pt-button-group">
        <a className="pt-button pt-icon-database" role="button">
          Queries
        </a>
        <a className="pt-button pt-icon-function" role="button">
          Functions
        </a>
        <a
          className="pt-button"
          role="button"
          onClick={this.props.onExport}
          download=""
        >
          Export{' '}
          <span className="pt-icon-standard pt-icon-caret-down pt-align-right" />
        </a>
      </div>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<ReadPersistedState>): Handlers => ({
  onExport: () => dispatch(readPersistedState())
});

export default connect(null, mapDispatch)(ExportUserSettings);
