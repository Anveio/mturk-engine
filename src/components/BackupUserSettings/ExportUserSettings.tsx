import * as React from 'react';
import * as localforage from 'localforage';
// import { Button } from '@blueprintjs/core';
export interface Props {}

class ExportUserSettings extends React.PureComponent<Props, never> {
  static 

  private downloadDataAsFile = async () => {
    try {
      const data = await ExportUserSettings.stringifyPersistedState();
      console.log(data.join(''));
    } catch (e) {}
  };

  // static uploadDataFromFile = (stringifedUserSettings: string[]) => {
  //   const x = stringifedUserSettings.reduce((acc, cur: string) => {
  //     const [key, value] = cur.split(/"reduxPersist:(.*?)"/).slice(1);
  //     return { ...acc, [key]: value };
  //   }, {});
  //   console.log(x);
  // };

  public render() {
    return (
      <div className="pt-button-group .modifier">
        <a className="pt-button pt-icon-database" role="button">
          Queries
        </a>
        <a className="pt-button pt-icon-function" role="button">
          Functions
        </a>
        <a
          className="pt-button"
          role="button"
          onClick={this.downloadDataAsFile}
          download=""
        >
          Export{' '}
          <span className="pt-icon-standard pt-icon-caret-down pt-align-right" />
        </a>
      </div>
    );
  }
}

export default ExportUserSettings;
