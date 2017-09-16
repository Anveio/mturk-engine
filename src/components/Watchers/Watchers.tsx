import * as React from 'react';
import { Layout } from '@shopify/polaris';
// import { Tree, TreeNode, Tooltip } from '@blueprintjs/core';
import WatcherInput from './WatcherInput';
import WatcherCard from '../../containers/WatcherCard';

import { List } from 'immutable';

export interface Props {
  readonly watcherIds: List<string>;
}

class Watchers extends React.PureComponent<Props, never> {
  static generateColumn = (offset: number) => (
    watcherIds: List<string>
  ): JSX.Element[] => {
    if (watcherIds.size === 0) {
      return [];
    }

    let column: JSX.Element[] = [];

    for (let i = offset; i < watcherIds.size; i += 3) {
      const id = watcherIds.get(i);
      column.push(<WatcherCard watcherId={id} key={id} />);
    }

    return column;
  };

  public render() {
    const { watcherIds } = this.props;

    return (
      <Layout>
        <Layout.AnnotatedSection
          title="Add a watcher"
          description="Enter a groupID or a pandA link."
        >
          <WatcherInput />
        </Layout.AnnotatedSection>

        <Layout.Section secondary>
          {Watchers.generateColumn(0)(watcherIds)}
        </Layout.Section>
        <Layout.Section secondary>
          {Watchers.generateColumn(1)(watcherIds)}
        </Layout.Section>
        <Layout.Section secondary>
          {Watchers.generateColumn(2)(watcherIds)}
        </Layout.Section>
      </Layout>
    );
  }
  // public render() {
  //   return (
  //     <div className="pt-tree pt-elevation-0">
  //       <ul className="pt-tree-node-list pt-tree-root">
  //         <li className="pt-tree-node pt-tree-node-expanded">
  //           <div className="pt-tree-node-content">
  //             <span className="pt-tree-node-caret pt-tree-node-caret-open pt-icon-standard" />
  //             <span className="pt-tree-node-icon pt-icon-standard pt-icon-folder-close" />
  //             <span className="pt-tree-node-label">Label</span>
  //             <span className="pt-tree-node-secondary-label">
  //               Secondary label
  //             </span>
  //           </div>
  //           <ul className="pt-tree-node-list">
  //             <li className="pt-tree-node">
  //               <div className="pt-tree-node-content">
  //                 <span className="pt-tree-node-caret-none pt-icon-standard" />
  //                 <span className="pt-tree-node-icon pt-icon-standard pt-icon-document" />
  //                 <span className="pt-tree-node-label">A Document</span>
  //               </div>
  //             </li>
  //             <li className="pt-tree-node">
  //               <div className="pt-tree-node-content">
  //                 <span className="pt-tree-node-caret-none pt-icon-standard" />
  //                 <span className="pt-tree-node-icon pt-icon-standard pt-icon-document" />
  //                 <span className="pt-tree-node-label">Another Document</span>
  //               </div>
  //             </li>
  //           </ul>
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // }
}

export default Watchers;
