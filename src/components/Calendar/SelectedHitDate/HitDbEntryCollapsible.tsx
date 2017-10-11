import * as React from 'react';
import { Collapsible, Card, Stack, TextStyle, Caption } from '@shopify/polaris';
import { HitDatabaseEntry } from '../../../types';
import EditBonusButton from './EditBonusButton';

export interface Props {
  readonly open: boolean;
  readonly hit: HitDatabaseEntry;
}

class HitDbEntryCollapsible extends React.PureComponent<Props, never> {
  public render() {
    const { open, hit: { id, feedback, requester, bonus } } = this.props;
    return (
      <Collapsible open={open}>
        <Card.Section>
          <Stack vertical spacing="loose" distribution="equalSpacing">
            <Caption>
              Hit ID: <TextStyle variation="strong">{id}</TextStyle>
            </Caption>
            <Caption>
              Requester: {' '}
              <TextStyle variation="strong">{requester.name}</TextStyle>
            </Caption>
            <Caption>
              Feedback: {' '}
              <TextStyle variation="strong">
                {feedback || 'No feedback given.'}
              </TextStyle>
            </Caption>
            <EditBonusButton hitId={id} bonus={bonus} />
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

export default HitDbEntryCollapsible;
