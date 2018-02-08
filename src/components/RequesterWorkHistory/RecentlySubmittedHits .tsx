import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { RootState, HitDatabaseEntry } from '../../types';
import { Card, TextContainer, Heading, Stack } from '@shopify/polaris';
import { allHitsSubmittedToRequesterRecentFirst } from '../../selectors/hitDatabase';
import { pluralize } from '../../utils/formatting';
import SubmittedHitsCaptionedList from './SubmittedHitsCaptionedList';

interface OwnProps {
  readonly requesterId: string;
  readonly requesterName: string;
}

interface Props {
  readonly hits: List<HitDatabaseEntry>;
}

class RecentlySubmittedHits extends React.PureComponent<
  Props & OwnProps,
  never
> {
  public render() {
    const { hits, requesterName } = this.props;
    return (
      <Card sectioned>
        <Stack vertical>
          <TextContainer>
            <Heading>
              {`${hits.size} ${pluralize('HIT', 'HITs')(
                hits.size
              )} from "${requesterName}" found in your database.`}
            </Heading>
            {hits.size > 5 ? (
              <p>Showing the 5 most recently submitted HITs.</p>
            ) : (
              undefined
            )}
          </TextContainer>
          <SubmittedHitsCaptionedList
            hits={hits.slice(0, 5) as List<HitDatabaseEntry>}
          />
        </Stack>
      </Card>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hits: allHitsSubmittedToRequesterRecentFirst(ownProps.requesterId)(state)
});

export default connect(mapState)(RecentlySubmittedHits);
