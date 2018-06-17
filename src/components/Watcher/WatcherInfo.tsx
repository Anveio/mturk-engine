import * as React from 'react';
import { Card, TextContainer } from '@shopify/polaris';
import { EditableText } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { RootState } from 'types';
import { normalizedWatchers } from 'selectors/watchers';

interface OwnProps {
  readonly watcherId: string;
  readonly onChangeDescription: (value: string) => void;
}

interface Props {
  readonly description: string;
}

interface State {
  readonly description: string;
  readonly editable: boolean;
}

class WatcherInfo extends React.PureComponent<Props & OwnProps, State> {
  public readonly state: State = {
    description: this.props.description,
    editable: false
  };

  private toggleEditableState = () =>
    this.setState((prevState: State) => ({
      editable: !prevState.editable
    }));

  private handleChange = (value: string) =>
    this.setState(() => ({
      description: value
    }));

  private resetDescription = () =>
    this.setState((prevState: State) => ({
      description: this.props.description,
      editable: false
    }));

  public render() {
    return (
      <Card
        title={`Description`}
        actions={[
          {
            content: this.state.editable ? 'Stop editing' : 'Edit description',
            onAction: this.toggleEditableState
          }
        ]}
      >
        <Card.Section>
          {this.state.editable ? (
            <EditableText
              multiline
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
        </Card.Section>
      </Card>
    );
  }
}
const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  description: normalizedWatchers(state).get(ownProps.watcherId).description
});

export default connect(mapState)(WatcherInfo);
