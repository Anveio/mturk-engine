import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, ButtonGroup, Button } from '@shopify/polaris';
import { RootState } from 'types';
import {
  FetchStatusDetailRequest,
  statusDetailRequest
} from 'actions/statusDetail';
import { stringToDate } from 'utils/dates';
import { LEGACY_DATE_FORMAT } from 'constants/misc';

interface Props {
  readonly selectedDate: string | null;
}

interface Handlers {
  readonly onRefresh: (date: Date) => void;
}

class ActionButtons extends React.PureComponent<Props & Handlers, never> {
  private handleRefresh = () => {
    if (!!this.props.selectedDate) {
      this.props.onRefresh(
        stringToDate(this.props.selectedDate)(LEGACY_DATE_FORMAT)
      );
    }
  };

  public render() {
    return (
      <Card.Section>
        <ButtonGroup>
          <Button plain onClick={this.handleRefresh} icon="refresh">
            Refresh Date
          </Button>
        </ButtonGroup>
      </Card.Section>
    );
  }
}

const mapState = (state: RootState): Props => ({
  selectedDate: state.selectedHitDbDate
});

const mapDispatch = (
  dispatch: Dispatch<FetchStatusDetailRequest>
): Handlers => ({
  onRefresh: date => dispatch(statusDetailRequest(date))
});

export default connect(mapState, mapDispatch)(ActionButtons);
