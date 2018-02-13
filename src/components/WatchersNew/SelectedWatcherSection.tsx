import * as React from 'react';
import { connect } from 'react-redux';
import { NonIdealState } from '@blueprintjs/core';
import { Layout } from '@shopify/polaris';
import { RootState, SelectionKind } from '../../types';
import WatcherCard from './WatcherCard';
import WatcherFolderInfo from './WatcherFolderInfo';
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
        return <WatcherFolderInfo folderId={id} />;
      default:
        throw new Error('Invalid selection kind.');
    }
  };

  render() {
    const { currentSelectionId, selectionKind } = this.props;
    const { renderFolderOrWatcher } = SelectedWatcherSection;
    console.log(currentSelectionId);
    return (
      <Layout.Section>
        {!currentSelectionId ? (
          <NonIdealState
            title="Select a Watcher"
            description="Watchers let you accept many of the same HIT or snag a rare one."
            visual="pt-icon-folder-shared-open"
          />
        ) : (
          renderFolderOrWatcher(selectionKind, currentSelectionId)
        )}
      </Layout.Section>
    );
  }
}

const mapState = (state: RootState): Props => ({
  currentSelectionId: getCurrentSelectionIdOrNull(state),
  selectionKind: state.watcherTree.selectionKind
});
export default connect(mapState)(SelectedWatcherSection);
