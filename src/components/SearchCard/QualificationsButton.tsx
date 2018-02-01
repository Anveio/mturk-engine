import * as React from 'react';
// import { connect } from 'react-redux';
import { Popover, Button, PopoverInteractionKind } from '@blueprintjs/core';
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

interface Props {
  readonly qualifications: WorkerQualification[];
}

class ViewQualificationsButton extends React.PureComponent<Props, never> {
  public render() {
    const { qualifications } = this.props;
    return (
      <Popover interactionKind={PopoverInteractionKind.CLICK}>
        <Button
          intent={0}
          className="pt-button pt-small pt-minimal"
          iconName="pt-icon-comparison"
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
                <Stack />

                {!qual.userMeetsQualification ? (
                  <PolarisButton
                    plain
                    external
                    disabled={!qual.hasTest}
                    url={`https://worker.mturk.com/qualifications/${
                      qual.qualificationId
                    }`}
                  >
                    Take Test
                  </PolarisButton>
                ) : (
                  undefined
                )}
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
