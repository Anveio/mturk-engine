import * as React from 'react';
import { Checkbox } from '@shopify/polaris';
// import { PersistedState } from '../../types';
// import { stateKeyMap } from '../../utils/backup';

export interface Props {
  readonly label: string;
  readonly checked: boolean;
}

class UploadedSettingsDisplay extends React.Component<Props, never> {
  public render() {
    return <Checkbox {...this.props} />;
  }
}

export default UploadedSettingsDisplay;
