import * as React from 'react';
// import { Tabs2 as Tabs, Tab2 as Tab } from '@blueprintjs/core';
// import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { Classes, Tree, NonIdealState } from '@blueprintjs/core';
import { Layout, Stack, DisplayText } from '@shopify/polaris';
import { RootState, WatcherKind, Watcher, WatcherTimerMap } from '../../types';
import {
  GenericTreeNode,
  WatcherTreeNode,
  FolderTreeNode
} from '../../utils/tree';
import { Dispatch } from 'redux';
import {
  SelectWatcherTreeNodeAction,
  selectWatcherFile,
  selectWatcherFolder
} from '../../actions/watcherTree';
import { getCurrentlySelectedWatcherOrNull } from '../../selectors/watcherTree';
import { watchersList } from '../../selectors/watchers';
import WatcherCard from './Watcher';
import WatcherSpinner from './WatcherSpinner';
import { watcherFoldersToTreeNodes } from '../../selectors/watcherFolders';

interface Props {
  readonly watcherFolders: FolderTreeNode[];
  readonly watchers: Watcher[];
  readonly watcherTimers: WatcherTimerMap;
  readonly currentlySelectedWatcher: Watcher | null;
}

interface Handlers {
  readonly onSelectWatcher: (id: string, kind: WatcherKind) => void;
  readonly onSelectFolder: (folderId: string) => void;
}

class WatchersNew extends React.Component<Props & Handlers, never> {
  private static appendChildNodes = (
    nodes: GenericTreeNode[],
    childNodes: GenericTreeNode[]
  ): GenericTreeNode[] => nodes.map(node => ({ ...node, childNodes }));

  private handleNodeClick = (nodeData: GenericTreeNode) => {
    nodeData.kind === 'folder'
      ? this.props.onSelectFolder(nodeData.id)
      : this.props.onSelectWatcher(nodeData.id, nodeData.kind);
  };

  static watchersArrayToTreeNodes = (
    watchers: Watcher[],
    selectionId: string | null,
    watcherTimers: WatcherTimerMap
  ): WatcherTreeNode[] =>
    watchers.map((watcher: Watcher): WatcherTreeNode => ({
      id: watcher.groupId,
      hasCaret: selectionId === watcher.groupId ? true : false,
      iconName: 'document',
      secondaryLabel: watcherTimers.get(watcher.groupId) ? (
        <WatcherSpinner id={watcher.groupId} />
      ) : (
        undefined
      ),
      label: watcher.title,
      kind: 'groupId'
    }));

  public render() {
    const {
      watchers,
      currentlySelectedWatcher,
      watcherTimers,
      watcherFolders
    } = this.props;
    const { appendChildNodes, watchersArrayToTreeNodes } = WatchersNew;

    const contents = appendChildNodes(
      watcherFolders,
      watchersArrayToTreeNodes(
        watchers,
        (currentlySelectedWatcher && currentlySelectedWatcher.groupId) || null,
        watcherTimers
      )
    );

    return (
      <Layout>
        <Layout.Section secondary>
          <Stack vertical>
            <DisplayText>Watchers</DisplayText>
            <Tree
              className={Classes.ELEVATION_0}
              onNodeClick={this.handleNodeClick}
              contents={contents}
            />
          </Stack>
        </Layout.Section>
        <Layout.Section>
          {currentlySelectedWatcher ? (
            <WatcherCard watcherId={currentlySelectedWatcher.groupId} />
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
  watcherFolders: watcherFoldersToTreeNodes(state),
  watchers: watchersList(state),
  currentlySelectedWatcher: getCurrentlySelectedWatcherOrNull(state),
  watcherTimers: state.watcherTimes
});

const mapDispatch = (
  dispatch: Dispatch<SelectWatcherTreeNodeAction>
): Handlers => ({
  onSelectWatcher: (id: string, kind: WatcherKind) =>
    dispatch(selectWatcherFile(id, kind)),
  onSelectFolder: (id: string) => dispatch(selectWatcherFolder(id))
});

export default connect(mapState, mapDispatch)(WatchersNew);
