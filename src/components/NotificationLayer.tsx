import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { List } from 'immutable';
import {
  RootState,
  SearchResult,
  SearchResults,
  NotificationSettings
} from '../types';
import { newResultsGroupIdsList, newResults } from '../selectors/search';
import { sendNotification, SendNotification } from '../actions/notifications';

interface Props {
  readonly notificationSettings: NotificationSettings;
  readonly unreadResults: List<string>;
  readonly newResults: SearchResults;
}

interface Handlers {
  readonly onUnreadHit: (hit: SearchResult, durationInSeconds: number) => void;
}

class NotificationLayer extends React.Component<Props & Handlers, never> {
  componentWillReceiveProps(nextProps: Props) {
    const { notificationSettings } = this.props;
    if (
      !nextProps.unreadResults.isSubset(this.props.unreadResults) &&
      notificationSettings.enabled
    ) {
      const resultsToNotify = NotificationLayer.generateResultsToNotifyUserOf(
        nextProps.newResults,
        notificationSettings.minReward
      );
      resultsToNotify.forEach((result: SearchResult) =>
        this.props.onUnreadHit(result, notificationSettings.durationInSeconds)
      );
    }
  }

  private static generateResultsToNotifyUserOf = (
    results: SearchResults,
    minReward: number
  ) =>
    /**
     * Users can receive 3 desktop notifications at a time.
     * So send notifications for only the 3 highest paying HITs.
     */

    results
      .filter((result: SearchResult) => result.reward >= minReward)
      .sort((a, b) => a.reward - b.reward)
      .slice(0, 3) as SearchResults;

  public render() {
    return <> </>;
  }
}

const mapState = (state: RootState): Props => ({
  unreadResults: newResultsGroupIdsList(state),
  newResults: newResults(state),
  notificationSettings: state.notificationSettings
});

const mapDispatch = (dispatch: Dispatch<SendNotification>): Handlers => ({
  onUnreadHit: (hit: SearchResult, durationInSeconds: number) => {
    dispatch(sendNotification(hit, durationInSeconds));
  }
});

export default connect(mapState, mapDispatch)(NotificationLayer);
