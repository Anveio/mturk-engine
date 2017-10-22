import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { RootState } from '../types';
import polarisStylesheet from '../utils/polarisStylesheet';
import calendarHeatMapStylesheet from '../utils/calendarHeatMapStylesheet';
import { newResults } from '../selectors/searchTable';

export interface Props {
  readonly numNewHits: number;
  readonly queueSize: number;
}

class CustomHead extends React.PureComponent<Props, never> {
  private static calculateTitle = (numNewHits: number, queueSize: number) =>
    numNewHits || queueSize > 0
      ? `*${numNewHits}/${queueSize}* (Unread/Queue) - Mturk Engine`
      : 'Mturk Engine';

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

const mapState = (state: RootState): Props => ({
  numNewHits: newResults(state).size,
  queueSize: state.queue.size
});

export default connect(mapState)(CustomHead);
