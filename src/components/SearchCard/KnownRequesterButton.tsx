import * as React from 'react';
import { Popover, Button, PopoverInteractionKind } from '@blueprintjs/core';
import RecentlySubmittedHits from '../RequesterWorkHistory/RecentlySubmittedHits ';

export interface Props {
  readonly knownRequester: boolean;
  readonly requesterId: string;
}

class KnownRequesterButton extends React.PureComponent<Props, never> {
  public render() {
    const { knownRequester, requesterId } = this.props;
    return knownRequester ? (
      <Popover interactionKind={PopoverInteractionKind.HOVER}>
        <Button
          intent={0}
          className="pt-button pt-small pt-minimal"
          iconName="pt-icon-search-template"
        >
          View requester work history
        </Button>
        <RecentlySubmittedHits requesterId={requesterId} />
      </Popover>
    ) : null;
  }
}

export default KnownRequesterButton;
