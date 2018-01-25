import * as React from 'react';
import { connect } from 'react-redux';
import { List as ImmutableList } from 'immutable';
import { RootState, HitDatabaseEntry } from '../../types';
import {
  Card,
  TextContainer,
  Heading,
  Stack,
  List,
  Caption
} from '@shopify/polaris';
import { stringToDate } from '../../utils/dates';
import { LEGACY_DATE_FORMAT } from '../../constants/misc';
import { getAllHitsSubmittedToRequester } from '../../selectors/hitDatabase';
import { pluralize } from '../../utils/formatting';

interface OwnProps {
  readonly requesterId: string;
}

interface Props {
  readonly hits: ImmutableList<HitDatabaseEntry>;
}

class RecentlySubmittedHits extends React.PureComponent<
  Props & OwnProps,
  never
> {
  public render() {
    const { hits } = this.props;
    return (
      <Card sectioned>
        <Stack vertical>
          <TextContainer>
            <Heading>
              {`${hits.size} ${pluralize(
                'HIT',
                'HITs',
                hits.size
              )} from this requester found in your database.`}
            </Heading>
          </TextContainer>
          <List>
            {hits.map((hit: HitDatabaseEntry) => (
              <List.Item key={hit.id}>
                {hit.title}
                <Caption>{`Submitted ${stringToDate(hit.date)(
                  LEGACY_DATE_FORMAT
                ).toLocaleDateString()}`}</Caption>
              </List.Item>
            ))}
          </List>
        </Stack>
      </Card>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hits: getAllHitsSubmittedToRequester(ownProps.requesterId)(state)
});

export default connect(mapState)(RecentlySubmittedHits);
