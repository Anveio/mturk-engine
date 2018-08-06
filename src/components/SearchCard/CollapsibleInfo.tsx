import {
  Card,
  Collapsible,
  Stack,
  TextContainer,
  TextStyle
} from '@shopify/polaris';
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, SearchResult } from '../../types';
import { secondsToMinutes } from '../../utils/dates';
import AddAsWatcherButton from '../Buttons/AddAsWatcherButton';
import BlockRequesterButton from '../Buttons/BlockRequesterButton';
import ExternalPlainButtons from '../Buttons/ExternalPlainButtons';
import KnownRequesterButton from '../Buttons/KnownRequesterButton';
import QualificationsButton from '../Buttons/QualificationsButton';
import HitActionMenu from '../Menu/HitActionMenu';
import MenuActivator from '../Menu/MenuActivator';
import { hitDatabaseToRequesterMap } from 'selectors/hitDatabase';

interface Props {
  readonly hit: SearchResult;
  readonly expanded: boolean;
  readonly knownRequester: boolean;
}

interface OwnProps {
  readonly groupId: string;
  readonly requesterId: string;
  readonly requesterName: string;
}

class CollapsibleInfo extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { hit, expanded, knownRequester } = this.props;
    const { description, timeAllottedInSeconds, requester } = hit;

    return (
      <Collapsible open={expanded} id={hit.groupId}>
        <Card.Section>
          <Stack vertical>
            <TextContainer>
              {`Description: ${description || 'No description.'}`}
            </TextContainer>
            <TextContainer>
              Time allotted:{' '}
              <TextStyle variation="strong">
                {secondsToMinutes(timeAllottedInSeconds)} minutes.
              </TextStyle>
            </TextContainer>
            {knownRequester && <KnownRequesterButton {...this.props} />}
            {!hit.qualified && (
              <QualificationsButton qualifications={hit.qualsRequired} />
            )}
            <Stack vertical={false} alignment="center">
              <MenuActivator accessibilityLabel="Additional actions">
                <HitActionMenu hit={hit} />
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
  expanded: state.expandedSearchResults.has(ownProps.groupId),
  knownRequester: hitDatabaseToRequesterMap(state).has(ownProps.requesterId)
});

export default connect(mapState)(CollapsibleInfo);
