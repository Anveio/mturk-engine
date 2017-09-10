import * as React from 'react';
import { ButtonGroup, Button } from '@shopify/polaris';

export interface Props {
  readonly groupId: string;
  readonly requesterId: string;
}

export interface State {
  readonly active: boolean;
}

class MiscActionsPopOver extends React.PureComponent<Props, State> {
  public readonly state = { active: false };

  static acceptBaseUrl = 'https://www.mturk.com/mturk/previewandaccept?groupId=';
  static previewBaseUrl = 'https://www.mturk.com/mturk/preview?groupId=';
  static topticonBaseUrl = 'https://turkopticon.ucsd.edu/';

  public render() {
    const { groupId, requesterId } = this.props;

    return (
      <ButtonGroup>
        <Button plain external url={MiscActionsPopOver.acceptBaseUrl + groupId}>
          Accept
        </Button>
        <Button
          plain
          external
          url={MiscActionsPopOver.previewBaseUrl + groupId}
        >
          Preview
        </Button>
        <Button
          plain
          external
          url={MiscActionsPopOver.topticonBaseUrl + requesterId}
        >
          TO.Page
        </Button>
      </ButtonGroup>
    );
  }
}

export default MiscActionsPopOver;
