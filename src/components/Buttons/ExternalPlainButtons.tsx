import * as React from 'react';
import { ButtonGroup, Button } from '@shopify/polaris';
import { SearchResult } from '../../types';
import TOpticonButton from './TOpticonButton';
import { generateAcceptUrl, generatePreviewUrl } from '../../utils/urls';
import { turkopticonTwoBaseUrl } from '../../constants/urls';

export interface OwnProps {
  readonly hit: SearchResult;
}

class ExternalPlainButtons extends React.PureComponent<OwnProps, never> {
  public render() {
    const { hit: { groupId, requester, qualified, canPreview } } = this.props;

    return (
      <ButtonGroup>
        <Button
          plain
          external
          url={generateAcceptUrl(groupId)}
          disabled={!qualified}
        >
          Accept
        </Button>
        <Button
          plain
          external
          url={generatePreviewUrl(groupId)}
          disabled={!canPreview}
        >
          Preview
        </Button>
        <TOpticonButton
          requesterId={requester.id}
          turkopticon={requester.turkopticon}
        />
        <Button plain external url={turkopticonTwoBaseUrl + requester.id}>
          T.O. 2 Page
        </Button>
      </ButtonGroup>
    );
  }
}
export default ExternalPlainButtons;
