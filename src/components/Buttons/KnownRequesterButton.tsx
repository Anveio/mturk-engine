import * as React from 'react';
import {
  Popover,
  Button,
  PopoverInteractionKind,
  Dialog,
  Intent
} from '@blueprintjs/core';
import RecentlySubmittedHits from '../RequesterWorkHistory/RecentlySubmittedHits ';
import RequesterWorkHistory from '../RequesterWorkHistory/RequesterWorkHistory';
import { SMALL_MINIMAL_BUTTON } from 'constants/blueprint';

interface Props {
  readonly requesterId: string;
  readonly requesterName: string;
}

interface State {
  readonly modalOpen: boolean;
}

class KnownRequesterButton extends React.PureComponent<Props, State> {
  public readonly state: State = { modalOpen: false };

  private toggleModal = () =>
    this.setState((prevState: State) => ({
      modalOpen: !prevState.modalOpen
    }));

  public render() {
    return (
      <React.Fragment>
        <Popover interactionKind={PopoverInteractionKind.HOVER}>
          <Button
            intent={Intent.PRIMARY}
            className={SMALL_MINIMAL_BUTTON}
            icon="history"
            onClick={this.toggleModal}
          >
            View requester work history
          </Button>
          <RecentlySubmittedHits {...this.props} />
        </Popover>
        <Dialog
          isOpen={this.state.modalOpen}
          onClose={this.toggleModal}
          title="Requester Work History"
          isCloseButtonShown={true}
        >
          <RequesterWorkHistory requesterId={this.props.requesterId} />
        </Dialog>
      </React.Fragment>
    );
  }
}

export default KnownRequesterButton;
