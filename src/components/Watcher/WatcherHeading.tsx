import * as React from 'react';
import { DisplayText } from '@shopify/polaris';
import { EditableText } from '@blueprintjs/core';
import { genericWarningToast } from '../../utils/toaster';

interface Props {
  readonly title: string;
  readonly onChange: (value: string) => void;
}

interface State {
  readonly title: string;
  readonly editing: boolean;
}

class WatcherHeading extends React.Component<Props, State> {
  public readonly state: State = { title: this.props.title, editing: false };

  private toggleEditingState = () =>
    this.setState((prevState: State): Partial<State> => ({
      editing: !prevState.editing
    }));

  private handleChange = (value: string) =>
    this.setState((): Partial<State> => ({
      title: value
    }));

  private resetTitle = () =>
    this.setState((prevState: State): Partial<State> => ({
      title: this.props.title,
      editing: false
    }));

  private handleConfirmEdit = () => {
    if (!(this.state.title.length > 0)) {
      this.resetTitle();
      genericWarningToast('Watcher folders cannot have a blank name.');
    } else {
      this.props.onChange(this.state.title);
    }
  };

  public render() {
    return (
      <DisplayText element="h2">
        <EditableText
          confirmOnEnterKey
          isEditing={this.state.editing}
          value={this.state.title}
          onCancel={this.resetTitle}
          onEdit={this.toggleEditingState}
          onConfirm={this.handleConfirmEdit}
          onChange={this.handleChange}
          maxLength={50}
        />
      </DisplayText>
    );
  }
}

export default WatcherHeading;
