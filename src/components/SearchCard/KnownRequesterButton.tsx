import * as React from 'react';
import { Button } from '@blueprintjs/core';

export interface Props {
  readonly knownRequester: boolean;
}

class KnownRequesterButton extends React.PureComponent<Props, never> {
  public render() {
    return this.props.knownRequester ? (
      <Button
        intent={0}
        className="pt-button pt-small pt-minimal"
        iconName="pt-icon-search-template"
      >
        View requester work history
      </Button>
    ) : null;
  }
}

export default KnownRequesterButton;
