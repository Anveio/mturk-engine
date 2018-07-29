import { Classes, Tree } from '@blueprintjs/core';
import { DisplayText, Layout, Stack } from '@shopify/polaris';
import { Map, Set } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  selectWatcherFile,
  toggleWatcherFolderExpand
} from '../../actions/watcherTree';
import {
  sortedFolderWatcherMap,
  watcherFoldersSortedByCreationDate
} from '../../selectors/watcherFolders';
import { getCurrentSelectionIdOrNull } from '../../selectors/watcherTree';
import {
  FolderId,
  RootState,
  SelectionKind,
  Watcher,
  WatcherFolder,
  WatcherFolderMap
} from '../../types';
import {
  FolderTreeNode,
  GenericTreeNode,
  WatcherTreeNode
} from '../../utils/tree';
import WatcherProgressDisplay from '../ProgressDisplay/WatcherProgressDisplay';
import CreateFolderButton from './CreateFolderButton';
import ProgressSpinner from './ProgressSpinner';
import SelectedWatcherSection from './SelectedWatcherSection';
import WatcherFolderActiveCount from './WatcherFolderActiveCount';

interface OwnHandlers {
  readonly handleDoubleClick: (nodeData: GenericTreeNode) => void;
}

interface Props {
  readonly watcherFolders: WatcherFolderMap;
  readonly watcherFolderMap: Map<FolderId, Watcher[]>;
  readonly expandedFolders: Set<FolderId>;
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
  shouldComponentUpdate(nextProps: Props & Handlers) {
    if (
      !nextProps.watcherFolderMap.equals(this.props.watcherFolderMap) ||
      !nextProps.watcherFolders.equals(this.props.watcherFolders) ||
      !nextProps.expandedFolders.equals(this.props.expandedFolders) ||
      !(
        nextProps.currentlySelectedWatcherId ===
        this.props.currentlySelectedWatcherId
      )
    ) {
      return true;
    }

    return false;
  }

  private handleNodeClick = (nodeData: GenericTreeNode) => {
    this.props.onSelectTreeNode(nodeData.id, nodeData.kind);
  };

  private handleNodeExpandToggle = (nodeData: GenericTreeNode) => {
    if (nodeData.kind === 'folder') {
      this.props.onToggleFolderExpand(nodeData.id);
    }
  };

  static createFolders = (
    folders: Map<FolderId, WatcherFolder>,
    watcherFolderMap: Map<FolderId, Watcher[]>,
    expandedFolderIds: Set<FolderId>
  ) => (selectionId: string | null): FolderTreeNode[] =>
    folders.reduce(
      (acc: FolderTreeNode[], folder: WatcherFolder): FolderTreeNode[] => [
        ...acc,
        {
          id: folder.id,
          label: folder.name,
          isExpanded: expandedFolderIds.has(folder.id),
          kind: 'folder',
          isSelected: selectionId === folder.id,
          icon: expandedFolderIds.has(folder.id)
            ? 'folder-open'
            : 'folder-close',
          childNodes: WatcherTree.createWatcherNodeArray(
            watcherFolderMap.get(folder.id, []),
            selectionId || null
          ),
          hasCaret: watcherFolderMap.has(folder.id),
          secondaryLabel: <WatcherFolderActiveCount id={folder.id} />
        }
      ],
      []
    );

  static createWatcherNodeArray = (
    watchers: Watcher[],
    selectionId: string | null
  ): WatcherTreeNode[] =>
    watchers.map(WatcherTree.createWatcherNode(selectionId));

  static createWatcherNode = (selectionId: string | null) => ({
    groupId,
    title
  }: Watcher): WatcherTreeNode => ({
    id: groupId,
    isSelected: selectionId === groupId ? true : false,
    icon: 'document',
    secondaryLabel: (
      <WatcherProgressDisplay
        id={groupId}
        render={(spinnerProgress, id) => (
          <div style={{ paddingBottom: '0.25em' }}>
            <ProgressSpinner progress={spinnerProgress} id={id} />
          </div>
        )}
      />
    ),
    label: title,
    kind: 'groupId'
  });

  public render() {
    const {
      currentlySelectedWatcherId,
      watcherFolders,
      watcherFolderMap,
      expandedFolders
    } = this.props;
    const { createFolders } = WatcherTree;

    const contents = createFolders(
      watcherFolders,
      watcherFolderMap,
      expandedFolders
    )(currentlySelectedWatcherId);

    return (
      <Layout>
        <Layout.Section secondary>
          <Stack vertical spacing="tight">
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
  expandedFolders: state.expandedWatcherFolderIds,
  watcherFolders: watcherFoldersSortedByCreationDate(state),
  watcherFolderMap: sortedFolderWatcherMap(state),
  currentlySelectedWatcherId: getCurrentSelectionIdOrNull(state)
});

const mapDispatch: Handlers = {
  onSelectTreeNode: selectWatcherFile,
  onToggleFolderExpand: toggleWatcherFolderExpand
};

export default connect(
  mapState,
  mapDispatch
)(WatcherTree);
