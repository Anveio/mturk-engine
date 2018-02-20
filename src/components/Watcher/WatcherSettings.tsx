import * as React from 'react';
import { connect } from 'react-redux';
import { Card, FormLayout, TextField, Select } from '@shopify/polaris';
import {
  Watcher,
  RootState,
  WatcherFolderMap,
  WatcherFolder
} from '../../types';
import { EditableWatcherField } from '../../actions/watcher';

interface OwnProps {
  readonly watcher: Watcher;
  readonly onEdit: (
    id: string,
    field: EditableWatcherField,
    value: string | number
  ) => void;
}

interface Props {
  readonly watcherFolders: WatcherFolderMap;
  readonly assignedFolder: WatcherFolder;
}

interface Option {
  readonly label: string;
  readonly value: string;
  readonly disabled?: boolean;
}

class WatcherSettings extends React.PureComponent<Props & OwnProps, never> {
  static validateNumber = (value: string): boolean => /^\d+$/.test(value);

  private handleEdit = (field: EditableWatcherField) => (value: string) => {
    this.props.onEdit(this.props.watcher.groupId, field, value);
  };

  private generateOptions = () =>
    this.props.watcherFolders.reduce(
      (acc: Option[], folder: WatcherFolder): Option[] => [
        ...acc,
        { value: folder.id, label: folder.name }
      ],
      []
    );

  // private getFolderIdFromFolderName = (folderName: string) => this.props.watcherFolders.

  public render() {
    const { watcher, assignedFolder } = this.props;
    const folderLabels = this.generateOptions();

    return (
      <Card sectioned>
        <FormLayout>
          <TextField
            label="Time between attempts"
            value={watcher.delay.toString()}
            type="number"
            min={0}
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
