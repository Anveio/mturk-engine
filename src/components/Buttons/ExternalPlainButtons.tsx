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
  public static AcceptButton: React.SFC<{
    groupId: string;
    qualified: boolean;
  }> = props => (
    <Button
      plain
      external
      url={generateAcceptUrl(props.groupId)}
      disabled={!props.qualified}
    >
      Accept
    </Button>
  );

  public static PreviewButton: React.SFC<{
    groupId: string;
    canPreview: boolean;
  }> = props => (
    <Button
      plain
      external
      url={generatePreviewUrl(props.groupId)}
      disabled={!props.canPreview}
    >
      Preview
    </Button>
  );

  public static TurkopticonTwoLinkButton: React.SFC<{
    requesterId: string;
  }> = props => (
    <Button plain external url={turkopticonTwoBaseUrl + props.requesterId}>
      T.O. 2 Page
    </Button>
  );

  public render() {
    const { hit } = this.props;
    const {
      AcceptButton,
      PreviewButton,
      TurkopticonTwoLinkButton
    } = ExternalPlainButtons;

    return (
      <ButtonGroup>
        <AcceptButton {...hit} />
        <PreviewButton {...hit} />
        <TOpticonButton
          requesterId={hit.requester.id}
          turkopticon={hit.requester.turkopticon}
        />
        <TurkopticonTwoLinkButton requesterId={hit.requester.id} />
      </ButtonGroup>
    );
  }
}
export default ExternalPlainButtons;
