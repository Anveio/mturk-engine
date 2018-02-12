import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Classes, Tree, NonIdealState } from '@blueprintjs/core';
import { Layout, Stack, DisplayText } from '@shopify/polaris';
import {
  RootState,
  WatcherKind,
  Watcher,
  WatcherTimerMap,
  WatcherFolder
} from '../../types';
import {
  GenericTreeNode,
  WatcherTreeNode,
  FolderTreeNode
} from '../../utils/tree';
import {
  SelectWatcherTreeNodeAction,
  selectWatcherFile
} from '../../actions/watcherTree';
import {
  selectWatcherFolder,
  toggleWatcherFolderExpand
} from '../../actions/watcherFolders';
import { getCurrentlySelectedWatcherIdOrNull } from '../../selectors/watcherTree';
import WatcherCard from './Watcher';
import WatcherProgress from './WatcherProgress';
import { watchersToFolderWatcherMap } from '../../selectors/watcherFolders';
import { Map } from 'immutable';

interface Props {
  readonly watcherFolders: Map<string, WatcherFolder>;
  readonly watcherFolderMap: Map<string, Watcher[]>;
  readonly watcherTimers: WatcherTimerMap;
  readonly currentlySelectedWatcherId: string | null;
}

interface Handlers {
  readonly onSelectWatcher: (id: string, kind: WatcherKind) => void;
  readonly onSelectFolder: (folderId: string) => void;
  readonly onToggleFolderExpand: (folderId: string) => void;
}

class WatchersNew extends React.Component<Props & Handlers, never> {
  private handleNodeClick = (nodeData: GenericTreeNode) => {
    nodeData.kind === 'folder'
      ? this.props.onSelectFolder(nodeData.id)
      : this.props.onSelectWatcher(nodeData.id, nodeData.kind);
  };

  private handleNodeExpandToggle = (nodeData: GenericTreeNode) => {
    if (nodeData.kind === 'folder') {
      this.props.onToggleFolderExpand(nodeData.id);
    }
  };

  static createFolders = (
    folders: Map<string, WatcherFolder>,
    watcherFolderMap: Map<string, Watcher[]>
  ) => (
    selectionId: string | null,
    watcherTimers: WatcherTimerMap
  ): FolderTreeNode[] =>
    folders.reduce(
      (acc: FolderTreeNode[], folder: WatcherFolder): FolderTreeNode[] => [
        ...acc,
        {
          id: folder.id,
          label: folder.name,
          isExpanded: folder.expanded,
          kind: 'folder',
          iconName: folder.expanded ? 'folder-open' : 'folder-close',
          childNodes: WatchersNew.assignWatchersToFolder(
            watcherFolderMap.get(folder.id, []),
            selectionId || null,
            watcherTimers
          ),
          hasCaret: true
        }
      ],
      []
    );

  static assignWatchersToFolder = (
    watchers: Watcher[],
    selectionId: string | null,
    watcherTimers: WatcherTimerMap
  ): WatcherTreeNode[] =>
    watchers.map(WatchersNew.createWatcher(selectionId, watcherTimers));

  static createWatcher = (
    selectionId: string | null,
    watcherTimers: WatcherTimerMap
  ) => ({ groupId, title }: Watcher): WatcherTreeNode => ({
    id: groupId,
    isSelected: selectionId === groupId ? true : false,
    iconName: 'document',
    secondaryLabel: watcherTimers.get(groupId) ? (
      <WatcherProgress id={groupId} />
    ) : (
      undefined
    ),
    label: title,
    kind: 'groupId'
  });

  public render() {
    const {
      currentlySelectedWatcherId,
      watcherTimers,
      watcherFolders,
      watcherFolderMap
    } = this.props;
    const { createFolders } = WatchersNew;

    const contents = createFolders(watcherFolders, watcherFolderMap)(
      currentlySelectedWatcherId,
      watcherTimers
    );

    return (
      <Layout>
        <Layout.Section secondary>
          <Stack vertical>
            <DisplayText>Watchers</DisplayText>
            <Tree
              className={Classes.ELEVATION_0}
              onNodeClick={this.handleNodeClick}
              onNodeCollapse={this.handleNodeExpandToggle}
              onNodeExpand={this.handleNodeExpandToggle}
              contents={contents}
            />
          </Stack>
        </Layout.Section>
        <Layout.Section>
          {currentlySelectedWatcherId ? (
            <WatcherCard watcherId={currentlySelectedWatcherId} />
          ) : (
            <NonIdealState
              title="Select a Watcher"
              description="Watchers let you accept many of the same HIT or snag a rare one."
              visual="pt-icon-folder-shared-open"
            />
          )}
        </Layout.Section>
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  watcherFolders: state.watcherFolders,
  watcherFolderMap: watchersToFolderWatcherMap(state),
  currentlySelectedWatcherId: getCurrentlySelectedWatcherIdOrNull(state),
  watcherTimers: state.watcherTimes
});

const mapDispatch = (
  dispatch: Dispatch<SelectWatcherTreeNodeAction>
): Handlers => ({
  onSelectWatcher: (id: string, kind: WatcherKind) =>
    dispatch(selectWatcherFile(id, kind)),
  onSelectFolder: (id: string) => dispatch(selectWatcherFolder(id)),
  onToggleFolderExpand: (id: string) => dispatch(toggleWatcherFolderExpand(id))
});

export default connect(mapState, mapDispatch)(WatchersNew);
