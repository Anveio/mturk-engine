import * as React from 'react';
import { ButtonGroup, Button } from '@shopify/polaris';

export interface Props {
  groupId: string;
  requesterId: string;
}

class SearchCardInfoButtons extends React.PureComponent<Props, never> {
  public render() {
    return (
      <ButtonGroup>
        <Button
          plain
          external
          url={`https://www.mturk.com/mturk/previewandaccept?groupId=${this
            .props.groupId}`}
        >
          Accept
        </Button>
        <Button
          plain
          external
          url={`https://www.mturk.com/mturk/preview?groupId=${this.props
            .groupId}`}
        >
          Preview
        </Button>
        <Button
          plain
          external
          url={`https://turkopticon.ucsd.edu/${this.props.requesterId}`}
        >
          T.O.
        </Button>
      </ButtonGroup>
    );
  }
}

export default SearchCardInfoButtons;
