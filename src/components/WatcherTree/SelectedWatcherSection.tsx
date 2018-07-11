import * as React from 'react';
import { connect } from 'react-redux';
import { NonIdealState } from '@blueprintjs/core';
import { Layout } from '@shopify/polaris';
import { RootState, SelectionKind } from '../../types';
import WatcherView from '../Watcher/WatcherView';
import WatcherFolderView from '../WatcherFolder/WatcherFolderView';
import { getCurrentSelectionIdOrNull } from '../../selectors/watcherTree';

interface Props {
  readonly currentSelectionId: string | null;
  readonly selectionKind: SelectionKind;
}

class SelectedWatcherSection extends React.Component<Props, never> {
  private static renderFolderOrWatcher = (kind: SelectionKind, id: string) => {
    switch (kind) {
      case 'groupId':
        return <WatcherView watcherId={id} />;
      case 'folder':
        return <WatcherFolderView folderId={id} />;
      default:
        throw new Error('Invalid selection kind.');
    }
  };

  private static renderEmptyState = () => (
    <NonIdealState
      title="Select a Watcher"
      description="Watchers let you accept many of the same HIT or snag a rare one."
      icon="folder-shared-open"
    />
  );

  render() {
    const { currentSelectionId, selectionKind } = this.props;
    const { renderEmptyState, renderFolderOrWatcher } = SelectedWatcherSection;
    return (
      <Layout.Section>
        {!currentSelectionId
          ? renderEmptyState()
          : renderFolderOrWatcher(selectionKind, currentSelectionId)}
      </Layout.Section>
    );
  }
}

const mapState = (state: RootState): Props => ({
  currentSelectionId: getCurrentSelectionIdOrNull(state),
  selectionKind: state.watcherTreeSettings.selectionKind
});
export default connect(mapState)(SelectedWatcherSection);
