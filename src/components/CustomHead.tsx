import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { RootState } from '../types';
import calendarHeatMapStylesheet from '../utils/calendarHeatMapStylesheet';
import { newResults } from '../selectors/search';

export interface Props {
  readonly numNewHits: number;
  readonly queueSize: number;
}

class CustomHead extends React.PureComponent<Props, never> {
  private static calculateTitle = (numNewHits: number, queueSize: number) =>
    numNewHits || queueSize > 0
      ? `Unread: ${numNewHits}, Queued: ${queueSize} - Mturk Engine`
      : 'Mturk Engine';

  public render() {
    return (
      <Helmet
        title={CustomHead.calculateTitle(
          this.props.numNewHits,
          this.props.queueSize
        )}
      >
        <style>{calendarHeatMapStylesheet}</style>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/normalize.css@^8.0.0"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/@blueprintjs/core@^3.0.0/lib/css/blueprint.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/@blueprintjs/icons@^3.0.0/lib/css/blueprint-icons.css"
        />
        <link
          rel="stylesheet"
          href="https://sdks.shopifycdn.com/polaris/2.5.0/polaris.min.css"
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
