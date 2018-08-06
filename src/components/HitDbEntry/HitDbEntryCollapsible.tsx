import * as React from 'react';
import {
  Collapsible,
  Card,
  Stack,
  TextStyle,
  TextContainer
} from '@shopify/polaris';
import { HitDatabaseEntry } from 'types';
import EditBonusButton from './EditBonusButton';
import CopyTextButton from '../Buttons/CopyTextButton';
import { stringToDate } from 'utils/dates';
import { LEGACY_DATE_FORMAT } from 'constants/dates';
import MenuActivator from '../Menu/MenuActivator';
import HitDbEntryMenu from './HitDbEntryMenu';

interface Props {
  readonly open: boolean;
  readonly hit: HitDatabaseEntry;
  readonly renderDate?: boolean;
}

class HitDbEntryCollapsible extends React.PureComponent<Props, never> {
  public render() {
    const {
      open,
      hit: { id, feedback, bonus, date },
      renderDate
    } = this.props;
    return (
      <Collapsible open={open} id={id}>
        <Card.Section>
          <Stack vertical distribution="equalSpacing">
            {renderDate && (
              <TextContainer>
                Submitted:{' '}
                <TextStyle variation="strong">
                  {stringToDate(date)(LEGACY_DATE_FORMAT).toLocaleDateString()}
                </TextStyle>
              </TextContainer>
            )}
            <Stack vertical={false} alignment="center">
              <TextContainer>
                Hit ID: <TextStyle variation="strong">{id}</TextStyle>
              </TextContainer>
              <CopyTextButton
                textOnly
                primary
                copyText={id}
                buttonText="Copy"
                toastText={'HIT ID copied to clipboard.'}
                helpText={'Copy HIT ID'}
              />
            </Stack>
            {feedback && (
              <TextContainer>
                Feedback: <TextStyle variation="strong">{feedback}</TextStyle>
              </TextContainer>
            )}
            <Stack vertical={false} alignment="center">
              <MenuActivator accessibilityLabel="Additional actions">
                <HitDbEntryMenu hit={this.props.hit} />
              </MenuActivator>
              <EditBonusButton hitId={id} bonus={bonus} />
            </Stack>
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

export default HitDbEntryCollapsible;
