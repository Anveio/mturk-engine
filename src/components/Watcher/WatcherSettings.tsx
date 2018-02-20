import * as React from 'react';
import { connect } from 'react-redux';
import * as copy from 'copy-to-clipboard';
import {
  Card,
  FormLayout,
  TextField,
  Select,
  Checkbox
} from '@shopify/polaris';
import {
  Watcher,
  RootState,
  WatcherFolderMap,
  WatcherFolder,
  Primitive
} from '../../types';
import { EditableWatcherField } from '../../actions/watcher';
import { plainToast } from '../../utils/toaster';
import { watcherFoldersSortedByCreationDate } from '../../selectors/watcherFolders';

interface OwnProps {
  readonly watcher: Watcher;
  readonly onEdit: (
    id: string,
    field: EditableWatcherField,
    value: Primitive
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
  private copyId = () => {
    copy(this.props.watcher.groupId);
    plainToast(`"${this.props.watcher.groupId}" copied to clipboard.`);
  };

  private handleEdit = <T extends string | boolean>(
    field: EditableWatcherField
  ) => (value: T) => {
    this.props.onEdit(this.props.watcher.groupId, field, value);
  };

  private handleEditNumber = (field: EditableWatcherField) => (
    value: string
  ) => {
    this.props.onEdit(this.props.watcher.groupId, field, +value);
  };

  private generateOptions = () =>
    this.props.watcherFolders.reduce(
      (acc: Option[], folder: WatcherFolder): Option[] => [
        ...acc,
        { value: folder.id, label: folder.name }
      ],
      []
    );

  public render() {
    const { watcher, assignedFolder } = this.props;
    const folderLabels = this.generateOptions();

    return (
      <Card
        sectioned
        title="Settings"
        actions={[
          {
            content: 'Copy ID',
            onAction: this.copyId
          }
        ]}
      >
        <FormLayout>
          <TextField
            label="Time between attempts"
            id="text-input-delay"
            name="text-input-delay"
            value={watcher.delay.toString()}
            suffix="seconds"
            type="number"
            spellCheck={false}
            autoComplete={false}
            min={0}
            step={1}
            onChange={this.handleEditNumber('delay')}
          />
          <Select
            label="Assigned folder"
            id="select-folder"
            name="select-folder"
            options={folderLabels}
            value={assignedFolder.id}
            onChange={this.handleEdit<string>('folderId')}
          />
          <Checkbox
            label="Stop after first success"
            id="checkbox-stop-after-first-success"
            name="checkbox-stop-after-first-success"
            helpText="Enable for HITs that you only want one of, such as surveys."
            checked={watcher.stopAfterFirstSuccess}
            onChange={this.handleEdit<boolean>('stopAfterFirstSuccess')}
          />
        </FormLayout>
      </Card>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  watcherFolders: watcherFoldersSortedByCreationDate(state),
  assignedFolder: state.watcherFolders.get(ownProps.watcher.folderId)
});

export default connect(mapState)(WatcherSettings);
