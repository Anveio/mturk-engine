import * as React from 'react';
// import { Button } from '@blueprintjs/core';
export interface Props {}

class ExportUserSettings extends React.PureComponent<Props, never> {
  public render() {
    return (
      <div className="pt-button-group .modifier">
        <a className="pt-button pt-icon-database" role="button">
          Queries
        </a>
        <a className="pt-button pt-icon-function" role="button">
          Functions
        </a>
        <a className="pt-button" role="button">
          Options{' '}
          <span className="pt-icon-standard pt-icon-caret-down pt-align-right" />
        </a>
      </div>
    );
  }
}

export default ExportUserSettings;
