import * as React from 'react';
import { connect } from 'react-redux';
import { Collapsible, Card, Stack, Caption } from '@shopify/polaris';
import { SearchResult, RootState } from '../../types';
import ExternalPlainButtons from './ExternalPlainButtons';
import BlockRequesterButton from './BlockRequesterButton';
import AddAsWatcherButton from './AddAsWatcherButton';
import KnownRequesterButton from './KnownRequesterButton';

import { secondsToMinutes } from '../../utils/dates';
import QualificationsButton from './QualificationsButton';
import MenuActivator from '../MenuActivator';
import HitMenu from '../HitMenu';

interface Props {
  readonly hit: SearchResult;
  readonly expanded: boolean;
}

interface OwnProps {
  readonly groupId: string;
  readonly requesterId: string;
  readonly requesterName: string;
  readonly knownRequester: boolean;
}

class CollapsibleInfo extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { hit, expanded, knownRequester } = this.props;
    const { description, timeAllottedInSeconds, requester } = hit;

    return (
      <Collapsible open={expanded}>
        <Card.Section>
          <Stack vertical spacing="loose">
            <Caption>{`Requester: ${requester.name}`}</Caption>
            <Caption>
              {`Description: ${description || 'No description.'}`}
            </Caption>
            <Caption>
              {`Time allotted: ${secondsToMinutes(
                timeAllottedInSeconds
              )} minutes.`}
            </Caption>
            {knownRequester ? (
              <KnownRequesterButton {...this.props} />
            ) : (
              undefined
            )}
            {!hit.qualified ? (
              <QualificationsButton qualifications={hit.qualsRequired} />
            ) : (
              undefined
            )}
            <Stack vertical={false} alignment="center">
              <MenuActivator>
                <HitMenu hit={hit} />
              </MenuActivator>
              <BlockRequesterButton requester={requester} />
              <AddAsWatcherButton hit={hit} />
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
