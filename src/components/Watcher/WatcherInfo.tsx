import * as React from 'react';
import { Card, TextContainer } from '@shopify/polaris';
import { EditableText } from '@blueprintjs/core';

interface Props {
  readonly id: string;
  readonly description: string;
  readonly onChangeDescription: (value: string) => void;
}

interface State {
  readonly description: string;
  readonly editable: boolean;
}

class WatcherInfo extends React.PureComponent<Props, State> {
  public readonly state: State = {
    description: this.props.description,
    editable: false
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.id !== this.props.id) {
      this.setState((prevState: State): Partial<State> => ({
        description: nextProps.description,
        editable: false
      }));
    }
  }

  private toggleEditableState = () =>
    this.setState((prevState: State): Partial<State> => ({
      editable: !prevState.editable
    }));

  private handleChange = (value: string) =>
    this.setState((): Partial<State> => ({
      description: value
    }));

  private resetDescription = () =>
    this.setState((prevState: State): Partial<State> => ({
      description: this.props.description,
      editable: false
    }));

  private startEditingAction = {
    content: 'Edit description',
    onAction: this.toggleEditableState
  };

  private endEditingAction = {
    content: 'Stop editing',
    onAction: this.toggleEditableState
  };

  public render() {
    return (
      <Card
        sectioned
        title={`Description`}
        actions={[
          this.state.editable ? this.endEditingAction : this.startEditingAction
        ]}
      >
        {this.state.editable ? (
          <EditableText
            multiline
            selectAllOnFocus
            confirmOnEnterKey
            value={this.state.description}
            maxLength={1500}
            onChange={this.handleChange}
            onCancel={this.resetDescription}
            onConfirm={this.props.onChangeDescription}
            placeholder={`Click to edit description`}
          />
        ) : (
          <TextContainer>
            {this.props.description || 'No description.'}
          </TextContainer>
        )}
      </Card>
    );
  }
}

export default WatcherInfo;
