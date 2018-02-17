import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, WatcherTimerMap } from '../../types';
import WatcherTree from './WatcherTree';
import { GenericTreeNode } from '../../utils/tree';
import { cancelNextWatcherTick, scheduleWatcher } from '../../actions/watcher';
import {
  toggleWatcherFolderExpand,
  ToggleWatcherFolderExpand
} from '../../actions/watcherFolders';
import { ScheduleAction } from '../../actions/scheduler';

interface Props {
  watcherTimers: WatcherTimerMap;
}

interface Handlers {
  readonly onScheduleWatcher: (id: string) => void;
  readonly onCancelWatcher: (id: string) => void;
  readonly onToggleFolderExpand: (folderId: string) => void;
}

class DoubleClickHandler extends React.PureComponent<Props & Handlers, never> {
  private handleNodeDoubleClick = (nodeData: GenericTreeNode) => {
    if (nodeData.kind === 'folder') {
      this.props.onToggleFolderExpand(nodeData.id);
    } else if (nodeData.kind === 'groupId') {
      this.props.onScheduleWatcher(nodeData.id);
    }
  };

  public render() {
    return <WatcherTree handleDoubleClick={this.handleNodeDoubleClick} />;
  }
}

const mapState = (state: RootState): Props => ({
  watcherTimers: state.watcherTimes
});

const mapDispatch = (
  dispatch: Dispatch<ScheduleAction | ToggleWatcherFolderExpand>
): Handlers => ({
  onCancelWatcher: (id: string) => dispatch(cancelNextWatcherTick(id)),
  onScheduleWatcher: (id: string) => dispatch(scheduleWatcher(id)),
  onToggleFolderExpand: (id: string) => dispatch(toggleWatcherFolderExpand(id))
});

export default connect(mapState, mapDispatch)(DoubleClickHandler);
