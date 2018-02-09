import * as React from 'react';
// import { Tabs2 as Tabs, Tab2 as Tab } from '@blueprintjs/core';
// import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { Classes, Tree } from '@blueprintjs/core';
import { Layout, Stack, Card, DisplayText } from '@shopify/polaris';
import { RootState, WatcherKind, Watcher } from '../../types';
import { watchersListToTreeNodes } from '../../selectors/watchers';
import { GenericTreeNode } from '../../utils/tree';
import { Dispatch } from 'redux';
import {
  SelectWatcherTreeNodeAction,
  selectWatcherFile,
  selectWatcherFolder
} from '../../actions/watcherTree';
import { getCurrentlySelectedWatcherOrNull } from '../../selectors/watcherTree';

interface Props {
  readonly tree: GenericTreeNode[];
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
      hasCaret: true,
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

  private handleNodeClick = (
    nodeData: GenericTreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    nodeData.kind === 'folder'
      ? this.props.onSelectFolder(nodeData.id)
      : this.props.onSelectWatcher(nodeData.id, nodeData.kind);
  };

  public render() {
    const { tree, currentlySelectedWatcher } = this.props;
    const { initialNodes, appendChildNodes } = WatchersNew;
    const contents = appendChildNodes(initialNodes, tree);

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
          <Stack vertical>
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
          </Stack>
        </Layout.Section>;
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  tree: watchersListToTreeNodes(state),
  currentlySelectedWatcher: getCurrentlySelectedWatcherOrNull(state)
});

const mapDispatch = (
  dispatch: Dispatch<SelectWatcherTreeNodeAction>
): Handlers => ({
  onSelectWatcher: (id: string, kind: WatcherKind) =>
    dispatch(selectWatcherFile(id, kind)),
  onSelectFolder: (id: string) => dispatch(selectWatcherFolder(id))
});

export default connect(mapState, mapDispatch)(WatchersNew);
