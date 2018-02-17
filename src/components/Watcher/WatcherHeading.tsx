import * as React from 'react';
import { DisplayText } from '@shopify/polaris';
import { EditableText } from '@blueprintjs/core';

interface Props {
  readonly title: string;
  readonly onChange: (value: string) => void;
}

class WatcherHeading extends React.Component<Props, never> {
  public render() {
    return (
      <DisplayText element="h2">
        <EditableText
          value={this.props.title}
          onChange={this.props.onChange}
          maxLength={200}
        />
      </DisplayText>
    );
  }
}

export default WatcherHeading;
