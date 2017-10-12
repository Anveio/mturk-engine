import * as React from 'react';
import { Helmet } from 'react-helmet';
import polarisStylesheet from '../utils/polarisStylesheet';
import calendarHeatMapStylesheet from '../utils/calendarHeatMapStylesheet';

export interface Props {
  readonly numNewHits: number;
  readonly queueSize: number;
}

class CustomHead extends React.PureComponent<Props, never> {
  static calculateTitle = (numNewHits: number, queueSize: number) => {
    return numNewHits || queueSize > 0
      ? `*${numNewHits}/${queueSize}* (Unread/Queue)`
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
        <style>{polarisStylesheet}</style>
        <style>{calendarHeatMapStylesheet}</style>
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
