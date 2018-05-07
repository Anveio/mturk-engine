import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, WatcherTimerMap } from '../../types';
import WatcherTree from './WatcherTree';
import { GenericTreeNode, WatcherTreeNode } from '../../utils/tree';
import { cancelNextWatcherTick, scheduleWatcher } from '../../actions/watcher';
import {
  toggleWatcherFolderExpand,
  ToggleWatcherFolderExpand
} from '../../actions/watcherTree';
import { ScheduleAction } from '../../actions/scheduler';

interface Props {
  readonly watcherTimers: WatcherTimerMap;
}

interface Handlers {
  readonly onScheduleWatcher: (id: string, origin: number) => void;
  readonly onCancelWatcher: (id: string) => void;
  readonly onToggleFolderExpand: (folderId: string) => void;
}

class DoubleClickHandler extends React.PureComponent<Props & Handlers, never> {
  private watcherIsActive = (nodeData: WatcherTreeNode) =>
    this.props.watcherTimers.has(nodeData.id);

  private handleNodeDoubleClick = (nodeData: GenericTreeNode) => {
    const { id } = nodeData;

    if (nodeData.kind === 'folder') {
      this.props.onToggleFolderExpand(id);
    } else if (nodeData.kind === 'groupId') {
      this.watcherIsActive(nodeData)
        ? this.props.onCancelWatcher(id)
        : this.props.onScheduleWatcher(id, Date.now());
    }
  };

  public render() {
    return <WatcherTree handleDoubleClick={this.handleNodeDoubleClick} />;
  }
}

const mapState = (state: RootState): Props => ({
  watcherTimers: state.watcherTimers
});

const mapDispatch = (
  dispatch: Dispatch<ScheduleAction | ToggleWatcherFolderExpand>
): Handlers => ({
  onCancelWatcher: (id: string) => dispatch(cancelNextWatcherTick(id)),
  onScheduleWatcher: (id: string, origin: number) =>
    dispatch(scheduleWatcher(id, origin)),
  onToggleFolderExpand: (id: string) => dispatch(toggleWatcherFolderExpand(id))
});

export default connect(mapState, mapDispatch)(DoubleClickHandler);
