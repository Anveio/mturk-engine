import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'types';
import { numActiveWatchersInFolder } from 'selectors/watcherTimers';

interface Props {
  readonly activeWatchersInFolder: number;
}

interface OwnProps {
  readonly id: string;
}

class WatcherFolderActiveCount extends React.PureComponent<
  Props & OwnProps,
  never
> {
  public render() {
    return (
      this.props.activeWatchersInFolder > 0 &&
      `(${this.props.activeWatchersInFolder.toString()})`
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  activeWatchersInFolder: numActiveWatchersInFolder(ownProps.id)(state)
});

export default connect(mapState)(WatcherFolderActiveCount);
