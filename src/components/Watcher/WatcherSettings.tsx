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
import WatcherStatistics from './WatcherStatistics';
import { validatePositiveNumber } from '../../utils/validation';
import { watchForEnter } from '../../utils/watchForEnter';

interface OwnProps {
  readonly watcher: Watcher;
  readonly onEdit: (
    id: string,
    field: EditableWatcherField,
    value: Primitive
  ) => void;
  readonly onToggle: () => void;
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
    const valid = validatePositiveNumber(value) || value === '';
    if (valid) {
      this.props.onEdit(
        this.props.watcher.groupId,
        field,
        Math.min(+value, 9999999)
      );
    }
  };

  private generateOptions = () =>
    this.props.watcherFolders.reduce(
      (acc: Option[], folder: WatcherFolder): Option[] => [
        ...acc,
        { value: folder.id, label: folder.name }
      ],
      []
    );

  private handleEnterKeyPress = watchForEnter(this.props.onToggle);

  public render() {
    const { watcher, assignedFolder } = this.props;
    const folderLabels = this.generateOptions();

    return (
      <Card
        title="Settings"
        actions={[
          {
            content: 'Copy ID',
            onAction: this.copyId
          }
        ]}
      >
        <Card.Section>
          <div onKeyPress={this.handleEnterKeyPress}>
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
                maxLength={6}
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
          </div>
        </Card.Section>
        <Card.Section subdued>
          <WatcherStatistics groupId={watcher.groupId} />
        </Card.Section>
      </Card>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  watcherFolders: watcherFoldersSortedByCreationDate(state),
  assignedFolder: state.watcherFolders.get(ownProps.watcher.folderId)
});

export default connect(mapState)(WatcherSettings);
