import * as React from 'react';
// import { Tabs2 as Tabs, Tab2 as Tab } from '@blueprintjs/core';
// import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { Classes, Tree, Spinner, NonIdealState } from '@blueprintjs/core';
import { Layout, Stack, DisplayText } from '@shopify/polaris';
import { RootState, WatcherKind, Watcher, WatcherTimerMap } from '../../types';
import { GenericTreeNode, WatcherTreeNode } from '../../utils/tree';
import { Dispatch } from 'redux';
import {
  SelectWatcherTreeNodeAction,
  selectWatcherFile,
  selectWatcherFolder
} from '../../actions/watcherTree';
import { getCurrentlySelectedWatcherOrNull } from '../../selectors/watcherTree';
import { watchersList } from '../../selectors/watchers';
import WatcherCard from './Watcher';

interface Props {
  readonly watchers: Watcher[];
  readonly watcherTimers: WatcherTimerMap;
  readonly currentlySelectedWatcher: Watcher | null;
}

interface Handlers {
  readonly onSelectWatcher: (id: string, kind: WatcherKind) => void;
  readonly onSelectFolder: (folderId: string) => void;
}

class WatchersNew extends React.Component<Props & Handlers, never> {
  private static initialNodes: GenericTreeNode[] = [
    {
      id: '___UNSORTED_WATCHER_FOLDER___',
      iconName: 'folder-open',
      isExpanded: true,
      label: 'Unsorted Watchers',
      kind: 'folder'
    }
  ];

  shouldComponentUpdate() {
    return true;
  }

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
      isExpanded: false,
      hasCaret: selectionId === watcher.groupId ? true : false,
      iconName: 'document',
      secondaryLabel: watcherTimers.get(watcher.groupId) ? (
        <div style={{ paddingTop: '0.4em' }}>
          <Spinner className={Classes.SMALL} />
        </div>
      ) : (
        undefined
      ),
      label: watcher.title,
      kind: 'groupId'
    }));

  public render() {
    const { watchers, currentlySelectedWatcher, watcherTimers } = this.props;
    const {
      initialNodes,
      appendChildNodes,
      watchersArrayToTreeNodes
    } = WatchersNew;
    const contents = appendChildNodes(
      initialNodes,
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
            <NonIdealState />
          )}
          {/* <Stack vertical>
            <DisplayText>
              {currentlySelectedWatcher
                ? `${currentlySelectedWatcher.title}`
                : 'Select a Watcher'}
            </DisplayText>
            <Card sectioned>
              {currentlySelectedWatcher
                ? currentlySelectedWatcher.description
                : 'No description'}
            </Card>
          </Stack> */}
        </Layout.Section>;
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
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
