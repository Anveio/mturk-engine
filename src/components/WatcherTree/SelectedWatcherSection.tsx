import * as React from 'react';
import { connect } from 'react-redux';
import { NonIdealState } from '@blueprintjs/core';
import { Layout } from '@shopify/polaris';
import { RootState, SelectionKind } from '../../types';
import WatcherCard from '../Watcher/WatcherCard';
import WatcherFolder from '../WatcherFolder/WatcherFolder';
import { getCurrentSelectionIdOrNull } from '../../selectors/watcherTree';

interface Props {
  readonly currentSelectionId: string | null;
  readonly selectionKind: SelectionKind;
}

class SelectedWatcherSection extends React.Component<Props, never> {
  private static renderFolderOrWatcher = (kind: SelectionKind, id: string) => {
    switch (kind) {
      case 'groupId':
        return <WatcherCard watcherId={id} />;
      case 'folder':
        return <WatcherFolder folderId={id} />;
      default:
        throw new Error('Invalid selection kind.');
    }
  };

  private static renderEmptyState = () => (
    <NonIdealState
      title="Select a Watcher"
      description="Watchers let you accept many of the same HIT or snag a rare one."
      visual="pt-icon-folder-shared-open"
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
  selectionKind: state.watcherTree.selectionKind
});
export default connect(mapState)(SelectedWatcherSection);
