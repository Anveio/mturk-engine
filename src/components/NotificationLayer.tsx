import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { List } from 'immutable';
import {
  RootState,
  SearchResult,
  SearchResults,
  NotificationSettings
} from '../types';
import { sendNotification, SendNotification } from '../actions/notifications';
import {
  topThreePayingResultsSuitableForNotification,
  topThreePayingResultsGroupIds
} from '../selectors/notificationSettings';

interface Props {
  readonly notificationSettings: NotificationSettings;
  readonly newResults: SearchResults;
  readonly newResultsGroupIds: List<string>;
}

interface Handlers {
  readonly onUnreadHit: (hit: SearchResult, durationInSeconds: number) => void;
}

class NotificationLayer extends React.Component<Props & Handlers, never> {
  componentWillReceiveProps(nextProps: Props) {
    const { notificationSettings, newResultsGroupIds, newResults } = nextProps;
    if (
      notificationSettings.enabled &&
      !newResultsGroupIds.isSubset(this.props.newResultsGroupIds)
    ) {
      newResults.forEach((result: SearchResult) =>
        this.props.onUnreadHit(result, notificationSettings.durationInSeconds)
      );
    }
  }

  public render() {
    return <> </>;
  }
}

const mapState = (state: RootState): Props => ({
  newResults: topThreePayingResultsSuitableForNotification(state),
  newResultsGroupIds: topThreePayingResultsGroupIds(state),
  notificationSettings: state.notificationSettings
});

const mapDispatch = (dispatch: Dispatch<SendNotification>): Handlers => ({
  onUnreadHit: (hit: SearchResult, durationInSeconds: number) => {
    dispatch(sendNotification(hit, durationInSeconds));
  }
});

export default connect(mapState, mapDispatch)(NotificationLayer);
