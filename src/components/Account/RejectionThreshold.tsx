import * as React from 'react';

export interface Props {

}

export interface State {
  readonly minimumRate: number
}

class RejectionThreshold extends React.PureComponent<Props, State> {
  
  
  public render() {
    return (
      <div></div>
    )
  }
}

export default RejectionThreshold;