import * as React from 'react';

export class Fragment extends React.Component<{}> {
  public render() {
    return this.props.children;
  }
}