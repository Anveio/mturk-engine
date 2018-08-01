import * as React from 'react';
import { connect } from 'react-redux';
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
  Primitive,
  GroupId
} from '../../types';
import { EditableWatcherField } from '../../actions/watcher';
import { watcherFoldersSortedByCreationDate } from '../../selectors/watcherFolders';
import WatcherStatistics from './WatcherStatistics';
import { validatePositiveNumber } from '../../utils/validation';
import { watchForEnter } from '../../utils/watchForEnter';
import { normalizedWatchers } from 'selectors/watchers';
import { handleCopy } from 'utils/clipboard';

interface OwnProps {
  readonly watcherId: GroupId;
  readonly onEdit: (
    id: string,
    field: EditableWatcherField,
    value: Primitive
  ) => void;
  readonly onToggle: () => void;
}

interface Props {
  readonly watcher: Watcher;
  readonly watcherFolders: WatcherFolderMap;
  readonly assignedFolder: WatcherFolder;
  readonly audioGloballyEnabled: boolean;
}

interface Option {
  readonly label: string;
  readonly value: string;
  readonly disabled?: boolean;
}

class WatcherSettings extends React.PureComponent<Props & OwnProps, never> {
  private static generateOptions = (folders: WatcherFolderMap) =>
    folders.reduce(
      (acc: Option[], folder: WatcherFolder): Option[] => [
        ...acc,
        { value: folder.id, label: folder.name }
      ],
      []
    );

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

  private handleEnterKeyPress = watchForEnter(this.props.onToggle);

  public render() {
    const {
      watcherFolders,
      watcher,
      assignedFolder,
      audioGloballyEnabled
    } = this.props;
    const folderLabels = WatcherSettings.generateOptions(watcherFolders);

    return (
      <Card
        title="Settings"
        actions={[
          {
            content: 'Copy ID',
            onAction: handleCopy(
              this.props.watcher.groupId,
              `"${this.props.watcher.groupId}" copied to clipboard.`
            )
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
                min={0.5}
                step={0.5}
                onChange={this.handleEditNumber('delay')}
                helpText={
                  watcher.delay < 5
                    ? 'Setting this too low can cause you to be temporarily locked out of using MTurk.'
                    : undefined
                }
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
                label="Stop after first successful accept"
                id="checkbox-stop-after-first-success"
                name="checkbox-stop-after-first-success"
                helpText="Enable for HITs that you only want one of, such as surveys."
                checked={watcher.stopAfterFirstSuccess}
                onChange={this.handleEdit<boolean>('stopAfterFirstSuccess')}
              />
              <Checkbox
                label="Play sound after successful accept"
                id="checkbox-play-sound"
                name="checkbox-play-sound"
                checked={watcher.playSoundAfterSuccess}
                onChange={this.handleEdit<boolean>('playSoundAfterSuccess')}
                error={
                  watcher.playSoundAfterSuccess && !audioGloballyEnabled
                    ? 'Audio is currently globally disabled. Enable it from the settings tab.'
                    : undefined
                }
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

const mapState = (state: RootState, ownProps: OwnProps): Props => {
  const watcher = normalizedWatchers(state).get(ownProps.watcherId);

  return {
    watcher,
    watcherFolders: watcherFoldersSortedByCreationDate(state),
    assignedFolder: state.watcherFolders.get(watcher.folderId),
    audioGloballyEnabled: state.audioSettingsV1.enabled
  };
};

export default connect(mapState)(WatcherSettings);
