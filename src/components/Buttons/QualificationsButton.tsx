import * as React from 'react';
// import { connect } from 'react-redux';
import {
  Popover,
  Button,
  PopoverInteractionKind,
  Intent
} from '@blueprintjs/core';
import {
  Card,
  List,
  Stack,
  Button as PolarisButton,
  TextStyle,
  Caption
} from '@shopify/polaris';
import { WorkerQualification } from '../../types';
import { qualificationToSentence } from '../../utils/export';
import { SMALL_MINIMAL_BUTTON } from 'constants/blueprint';

interface Props {
  readonly qualifications: WorkerQualification[];
}

class ViewQualificationsButton extends React.PureComponent<Props, never> {
  static TakeTestButton = ({
    hasTest,
    qualificationId,
    userMeetsQualification
  }: WorkerQualification) =>
    !userMeetsQualification ? (
      <PolarisButton
        plain
        external
        disabled={!hasTest}
        url={`https://worker.mturk.com/qualifications/${qualificationId}`}
      >
        Take Test
      </PolarisButton>
    ) : null;

  public render() {
    const { qualifications } = this.props;
    const { TakeTestButton } = ViewQualificationsButton;
    return (
      <Popover interactionKind={PopoverInteractionKind.CLICK}>
        <Button
          intent={Intent.PRIMARY}
          className={SMALL_MINIMAL_BUTTON}
          icon="comparison"
        >
          View qualifications
        </Button>
        <Card
          sectioned
          title={`You can take a test for qualifications you do not
              possess.`}
        >
          <List>
            {qualifications.map(qual => (
              <Stack
                key={qual.qualificationId}
                distribution="equalSpacing"
                alignment="baseline"
              >
                <List.Item key={qual.qualificationId}>
                  {qualificationToSentence(qual)}
                  <Caption>
                    <TextStyle
                      variation={
                        qual.userMeetsQualification ? 'positive' : 'strong'
                      }
                    >
                      Your value - {qual.userValue}
                    </TextStyle>
                  </Caption>
                </List.Item>
                <TakeTestButton {...qual} />
              </Stack>
            ))}
          </List>
        </Card>
      </Popover>
    );
  }
}

// const mapState = (state: RootState): Props => ({});

// export default connect(mapState)(ViewQualificationsButton);

export default ViewQualificationsButton;
