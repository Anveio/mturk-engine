import * as React from 'react';
import { ButtonGroup, Button } from '@shopify/polaris';
import { SearchResult } from '../../../types';
import TOpticonButton from './TOpticonButton';

export interface Props {
  readonly hit: SearchResult;
}

class MiscActionsPopOver extends React.PureComponent<Props, never> {
  static readonly acceptBaseUrl = 'https://www.mturk.com/mturk/previewandaccept?groupId=';
  static readonly previewBaseUrl = 'https://www.mturk.com/mturk/preview?groupId=';

  public render() {
    const { hit: { groupId, requester } } = this.props;
    const { acceptBaseUrl, previewBaseUrl } = MiscActionsPopOver;

    return (
      <ButtonGroup>
        <Button plain external url={acceptBaseUrl + groupId}>
          Accept
        </Button>
        <Button plain external url={previewBaseUrl + groupId}>
          Preview
        </Button>
        <TOpticonButton
          requesterId={requester.id}
          turkopticon={requester.turkopticon}
        />
      </ButtonGroup>
    );
  }
}

export default MiscActionsPopOver;
