import * as React from 'react';
import { Collapsible, Card, Stack, TextStyle, Caption } from '@shopify/polaris';
import { HitDatabaseEntry } from 'types';
import EditBonusButton from './EditBonusButton';
import CopyTextButton from '../Buttons/CopyTextButton';

interface Props {
  readonly open: boolean;
  readonly hit: HitDatabaseEntry;
}

class HitDbEntryCollapsible extends React.PureComponent<Props, never> {
  public render() {
    const {
      open,
      hit: { id, feedback, requester, bonus }
    } = this.props;
    return (
      <Collapsible open={open} id={id}>
        <Card.Section>
          <Stack vertical distribution="equalSpacing">
            <Stack vertical={false} alignment="center">
              <Caption>
                Hit ID: <TextStyle variation="strong">{id}</TextStyle>
              </Caption>
              <CopyTextButton
                textOnly
                primary
                copyText={id}
                buttonText="Copy"
                toastText={'HIT ID copied to clipboard.'}
                helpText={'Copy HIT ID'}
              />
            </Stack>
            <Stack vertical={false} alignment="center">
              <Caption>
                Requester:{' '}
                <TextStyle variation="strong">{requester.name}</TextStyle>
              </Caption>
              <CopyTextButton
                textOnly
                primary
                copyText={requester.name}
                buttonText="Copy"
                toastText={'Requester name copied to clipboard.'}
                helpText={'Copy requester name'}
              />
            </Stack>
            <Caption>
              Feedback:{' '}
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
