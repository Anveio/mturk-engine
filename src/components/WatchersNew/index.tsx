import * as React from 'react';
// import { Tabs2 as Tabs, Tab2 as Tab } from '@blueprintjs/core';
// import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { Classes, Tree, ITreeNode } from '@blueprintjs/core';
import { Layout, Stack, DisplayText } from '@shopify/polaris';
import { RootState } from '../../types';
import { watchersListToTreeNodes } from '../../selectors/watchers';

interface Props {
  readonly tree: List<ITreeNode>;
}

interface State {
  readonly nodes: ITreeNode[];
}

class WatchersNew extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nodes: [
        {
          id: 1,
          iconName: 'folder-close',
          isExpanded: true,
          hasCaret: true,
          label: 'Unsorted Watchers'
        }
      ]
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  private static appendChildNodes = (
    nodes: ITreeNode[],
    childNodes: ITreeNode[]
  ): ITreeNode[] => nodes.map(node => ({ ...node, childNodes }));

  private handleNodeClick = (
    nodeData: ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    const originallySelected = nodeData.isSelected;
    nodeData.isSelected =
      originallySelected == null ? true : !originallySelected;
    this.setState(this.state);
  };
  public render() {
    const contents = WatchersNew.appendChildNodes(
      this.state.nodes,
      this.props.tree.toArray()
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
          <DisplayText>Hey there don't be scared</DisplayText>
        </Layout.Section>;
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  tree: watchersListToTreeNodes(state)
});

export default connect(mapState)(WatchersNew);
