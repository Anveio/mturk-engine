import * as React from 'react';
// import { Watcher } from '../../types';

export interface Props {
  readonly watcher: string;
}

class WatcherCard extends React.PureComponent<Props, never> {
  public render() {
    return (
      <div className="pt-card pt-elevation-0 pt-interactive">
        <h5>
          <a href="#">{this.props.watcher}</a>
        </h5>
        <p>
          Overview of employee activity, including risk model, scores and
          scenario alert history.
        </p>
      </div>
    );
  }
}

export default WatcherCard;
