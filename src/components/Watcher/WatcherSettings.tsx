import * as React from 'react';
import { Card, FormLayout, TextField } from '@shopify/polaris';
import { Watcher } from '../../types';
import { EditableField } from '../../actions/editWatcher';

interface Props {
  readonly watcher: Watcher;
  readonly onEdit: (
    id: string,
    field: EditableField,
    value: string | number
  ) => void;
}

class WatcherSettings extends React.PureComponent<Props, never> {
  static validateNumber = (value: string): boolean => /^\d+$/.test(value);

  private handleEdit = (field: EditableField) => (value: string) => {
    this.props.onEdit(this.props.watcher.groupId, field, value);
  };

  public render() {
    const { watcher } = this.props;
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
        </FormLayout>
      </Card>
    );
  }
}

export default WatcherSettings;
