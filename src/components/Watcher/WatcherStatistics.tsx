import * as React from 'react';
import { connect } from 'react-redux';
import { Stack, Caption } from '@shopify/polaris';
import { RootState, WatcherStatistics, Watcher } from '../../types';
import { defaultWatcherStats } from '../../utils/watchers';
import { normalizedWatchers } from '../../selectors/watchers';

interface OwnProps {
  readonly groupId: string;
}

interface Props {
  readonly watcher: Watcher;
  readonly watcherStatistics: WatcherStatistics;
}

class WatcherSettings extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { watcher, watcherStatistics: { failures, successes } } = this.props;

    return (
      <Stack vertical={false}>
        <Stack.Item>
          <Caption>Successful accepts: {successes}</Caption>
        </Stack.Item>
        <Stack.Item fill>
          <Caption>Failed accepts: {failures}</Caption>
        </Stack.Item>
        <Stack.Item>
          <Caption>Created on {watcher.createdOn.toLocaleString()}</Caption>
        </Stack.Item>
      </Stack>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  watcher: normalizedWatchers(state).get(ownProps.groupId),
  watcherStatistics: state.watcherStatistics.get(
    ownProps.groupId,
    defaultWatcherStats
  )
});

export default connect(mapState)(WatcherSettings);
