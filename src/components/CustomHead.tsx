import * as React from 'react';
import { Helmet } from 'react-helmet';

export interface Props {
  readonly numNewHits: number;
  readonly queueSize: number;
}

class CustomHead extends React.PureComponent<Props, never> {
  static calculateTitle = (numNewHits: number, queueSize: number) => {
    return numNewHits || queueSize > 0
      ? `*${numNewHits} / ${queueSize}* unread & in queue`
      : 'Mturk Engine';
  };

  public render() {
    return (
      <Helmet
        title={CustomHead.calculateTitle(
          this.props.numNewHits,
          this.props.queueSize
        )}
      >
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/@blueprintjs/core@^1.11.0/dist/blueprint.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/normalize.css@^4.1.1"
        />
      </Helmet>
    );
  }
}

export default CustomHead;
