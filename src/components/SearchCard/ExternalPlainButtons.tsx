import * as React from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from '@shopify/polaris';
import { SearchResult, RootState } from '../../types';
import TOpticonButton from './TOpticonButton';
import { generateAcceptUrl, generatePreviewUrl } from '../../utils/urls';

export interface OwnProps {
  readonly hit: SearchResult;
}

export interface Props {
  readonly legacyLinksEnabled: boolean;
}

class MiscActionsPopOver extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const {
      legacyLinksEnabled,
      hit: { groupId, requester, qualified, canPreview }
    } = this.props;

    return (
      <ButtonGroup>
        <Button
          plain
          external
          url={generateAcceptUrl(groupId, legacyLinksEnabled)}
          disabled={!qualified}
        >
          Accept
        </Button>
        <Button
          plain
          external
          url={generatePreviewUrl(groupId, legacyLinksEnabled)}
          disabled={!canPreview}
        >
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

const mapState = (state: RootState): Props => ({
  legacyLinksEnabled: state.legacyLinksEnabled
});

export default connect(mapState)(MiscActionsPopOver);
