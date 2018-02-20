import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Map } from 'immutable';
import { Tree, Classes } from '@blueprintjs/core';
import { Layout, Stack, DisplayText } from '@shopify/polaris';
import { RootState, SelectionKind, Watcher, WatcherFolder } from '../../types';
import {
  GenericTreeNode,
  WatcherTreeNode,
  FolderTreeNode
} from '../../utils/tree';
import { SelectTreeNode, selectWatcherFile } from '../../actions/watcherTree';
import {
  WatcherFolderAction,
  toggleWatcherFolderExpand
} from '../../actions/watcherFolders';
import { getCurrentSelectionIdOrNull } from '../../selectors/watcherTree';
import { watchersToFolderWatcherMap, watcherFoldersSortedByCreationDate } from '../../selectors/watcherFolders';
import SelectedWatcherSection from './SelectedWatcherSection';
import WatcherProgress from './WatcherProgress';
import CreateFolderButton from './CreateFolderButton';

interface OwnHandlers {
  readonly handleDoubleClick: (nodeData: GenericTreeNode) => void;
}

interface Props {
  readonly watcherFolders: Map<string, WatcherFolder>;
  readonly watcherFolderMap: Map<string, Watcher[]>;
  readonly currentlySelectedWatcherId: string | null;
}

interface Handlers {
  readonly onSelectTreeNode: (id: string, kind: SelectionKind) => void;

  readonly onToggleFolderExpand: (folderId: string) => void;
}

class WatcherTree extends React.Component<
  Props & OwnHandlers & Handlers,
  never
> {
  private handleNodeClick = (nodeData: GenericTreeNode) => {
    this.props.onSelectTreeNode(nodeData.id, nodeData.kind);
  };

  private handleNodeExpandToggle = (nodeData: GenericTreeNode) => {
    if (nodeData.kind === 'folder') {
      this.props.onToggleFolderExpand(nodeData.id);
    }
  };

  static createFolders = (
    folders: Map<string, WatcherFolder>,
    watcherFolderMap: Map<string, Watcher[]>
  ) => (selectionId: string | null): FolderTreeNode[] =>
    folders.reduce(
      (acc: FolderTreeNode[], folder: WatcherFolder): FolderTreeNode[] => [
        ...acc,
        {
          id: folder.id,
          label: folder.name,
          isExpanded: folder.expanded,
          kind: 'folder',
          isSelected: selectionId === folder.id,
          iconName: folder.expanded ? 'folder-open' : 'folder-close',
          childNodes: WatcherTree.assignWatchersToFolder(
            watcherFolderMap.get(folder.id, []),
            selectionId || null
          ),
          hasCaret: watcherFolderMap.has(folder.id)
        }
      ],
      []
    );

  static assignWatchersToFolder = (
    watchers: Watcher[],
    selectionId: string | null
  ): WatcherTreeNode[] => watchers.map(WatcherTree.createWatcher(selectionId));

  static createWatcher = (selectionId: string | null) => ({
    groupId,
    title
  }: Watcher): WatcherTreeNode => ({
    id: groupId,
    isSelected: selectionId === groupId ? true : false,
    iconName: 'document',
    secondaryLabel: <WatcherProgress id={groupId} />,
    label: title,
    kind: 'groupId'
  });

  public render() {
    const {
      currentlySelectedWatcherId,
      watcherFolders,
      watcherFolderMap
    } = this.props;
    const { createFolders } = WatcherTree;

    const contents = createFolders(watcherFolders, watcherFolderMap)(
      currentlySelectedWatcherId
    );

    return (
      <Layout>
        <Layout.Section secondary>
          <Stack vertical>
            <Stack
              vertical={false}
              distribution="equalSpacing"
              alignment="baseline"
            >
              <DisplayText>Watchers</DisplayText>
            </Stack>
            <Tree
              className={Classes.ELEVATION_0}
              onNodeClick={this.handleNodeClick}
              onNodeDoubleClick={this.props.handleDoubleClick}
              onNodeCollapse={this.handleNodeExpandToggle}
              onNodeExpand={this.handleNodeExpandToggle}
              contents={contents}
            />
            <CreateFolderButton />
          </Stack>
        </Layout.Section>
        <SelectedWatcherSection />
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  watcherFolders: watcherFoldersSortedByCreationDate(state),
  watcherFolderMap: watchersToFolderWatcherMap(state),
  currentlySelectedWatcherId: getCurrentSelectionIdOrNull(state)
});

const mapDispatch = (
  dispatch: Dispatch<WatcherFolderAction | SelectTreeNode>
): Handlers => ({
  onSelectTreeNode: (id: string, kind: SelectionKind) =>
    dispatch(selectWatcherFile(id, kind)),
  onToggleFolderExpand: (id: string) => dispatch(toggleWatcherFolderExpand(id))
});

export default connect(mapState, mapDispatch)(WatcherTree);
