import * as React from 'react';
import { connect } from 'react-redux';
import { Collapsible, Card, Stack, Caption } from '@shopify/polaris';
import { SearchResult, RootState } from '../../types';
import MiscActionsPopover from './MiscActionsPopover';
import ExternalPlainButtons from './ExternalPlainButtons';
import BlockRequesterButton from './BlockRequesterButton';
import KnownRequesterButton from './KnownRequesterButton';

import { secondsToMinutes } from '../../utils/dates';

interface Props {
  readonly hit: SearchResult;
  readonly expanded: boolean;
}

interface OwnProps {
  readonly groupId: string;
  readonly requesterId: string;
  readonly knownRequester: boolean;
}

class CollapsibleInfo extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { hit, expanded, knownRequester, requesterId } = this.props;
    const { description, timeAllottedInSeconds, requester } = hit;

    return (
      <Collapsible open={expanded}>
        <Card.Section>
          <Stack vertical spacing="loose" distribution="equalSpacing">
            <Caption>{`Requester: ${requester.name}`}</Caption>
            <Caption>
              {`Description: ${description || 'No description.'}`}
            </Caption>
            <Caption>
              {`Time allotted: ${secondsToMinutes(
                timeAllottedInSeconds
              )} minutes.`}
            </Caption>
            <KnownRequesterButton
              knownRequester={knownRequester}
              requesterId={requesterId}
            />
            <Stack vertical={false} alignment="center">
              <MiscActionsPopover hit={hit} />
              <BlockRequesterButton requester={requester} />
              <ExternalPlainButtons hit={hit} />
            </Stack>
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.search.get(ownProps.groupId),
  expanded: !!state.expandedSearchResults.get(ownProps.groupId)
});

export default connect(mapState)(CollapsibleInfo);
