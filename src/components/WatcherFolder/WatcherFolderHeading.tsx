import * as React from 'react';
import { Stack, DisplayText, TextStyle, Caption } from '@shopify/polaris';
import { EditableText } from '@blueprintjs/core';

interface Props {
  readonly title: string;
  readonly editable: boolean;
  readonly onChange: (value: string) => void;
}

interface State {
  readonly title: string;
  readonly editing: boolean;
}

class WatcherFolderHeading extends React.Component<Props, State> {
  public readonly state: State = { title: this.props.title, editing: false };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.title !== this.props.title) {
      this.setState((prevState: State) => ({
        title: nextProps.title,
        editing: false
      }));
    }
  }

  private toggleEditingState = () =>
    this.setState((prevState: State) => ({
      editing: !prevState.editing
    }));

  private handleChange = (value: string) =>
    this.setState(() => ({
      title: value
    }));

  private resetTitle = () =>
    this.setState((prevState: State) => ({
      title: this.props.title,
      editing: false
    }));

  private handleConfirmEdit = () => {
    if (!(this.state.title.length > 0)) {
      this.resetTitle();
    } else {
      this.props.onChange(this.state.title);
    }
  };

  public render() {
    return (
      <Stack vertical={false} alignment="baseline">
        <Stack.Item fill>
          <DisplayText size="small" element="h2">
            <TextStyle variation="strong">
              <EditableText
                confirmOnEnterKey
                disabled={!this.props.editable}
                isEditing={this.state.editing}
                value={this.state.title}
                onCancel={this.resetTitle}
                onEdit={this.toggleEditingState}
                onConfirm={this.handleConfirmEdit}
                onChange={this.handleChange}
                maxLength={50}
              />
            </TextStyle>
          </DisplayText>
        </Stack.Item>
        {this.props.editable ? (
          <Caption>(click folder name to edit)</Caption>
        ) : null}
      </Stack>
    );
  }
}

export default WatcherFolderHeading;
