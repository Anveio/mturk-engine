import * as React from 'react';
import { connect } from 'react-redux';
import { Card, FormLayout, TextField, Select } from '@shopify/polaris';
import {
  Watcher,
  RootState,
  WatcherFolderMap,
  WatcherFolder
} from '../../types';
import { EditableField } from '../../actions/editWatcher';

interface OwnProps {
  readonly watcher: Watcher;
  readonly onEdit: (
    id: string,
    field: EditableField,
    value: string | number
  ) => void;
}

interface Props {
  readonly watcherFolders: WatcherFolderMap;
  readonly assignedFolder: WatcherFolder;
}

class WatcherSettings extends React.PureComponent<Props & OwnProps, never> {
  static validateNumber = (value: string): boolean => /^\d+$/.test(value);

  private handleEdit = (field: EditableField) => (value: string) => {
    this.props.onEdit(this.props.watcher.groupId, field, value);
  };

  public render() {
    const { watcher, watcherFolders, assignedFolder } = this.props;
    const folderLabels = watcherFolders.reduce(
      (acc: string[], folder: WatcherFolder) => [...acc, folder.name],
      []
    );

    return (
      <Card sectioned>
        <FormLayout>
          <TextField
            label="Time between attempts"
            value={watcher.delay.toString()}
            type="number"
            suffix="seconds"
            onChange={this.handleEdit('delay')}
          />
          <Select
            label="Assigned folder"
            options={folderLabels}
            value={assignedFolder.id}
            onChange={this.handleEdit('folderId')}
          />
        </FormLayout>
      </Card>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  watcherFolders: state.watcherFolders,
  assignedFolder: state.watcherFolders.get(ownProps.watcher.folderId)
});

export default connect(mapState)(WatcherSettings);
