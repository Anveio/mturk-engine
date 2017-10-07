import * as React from 'react';
import { Card, TextStyle } from '@shopify/polaris';
import { RootState, MaybeAccount } from '../../types';
import { formatAsCurrency } from '../../utils/formatting';
import { calculateAcceptanceRate } from '../../utils/hitDatabase';
import { connect } from 'react-redux';

export interface Props {
  readonly accountInfo: MaybeAccount;
}

class AccountStatisticsTable extends React.PureComponent<Props, never> {
  public render() {
    const { accountInfo } = this.props;
    if (!accountInfo) {
      return <div />;
    }

    return (
      <Card title="Account Statistics">
        <Card.Section>
          <table className="pt-table pt-condensed">
            <thead>
              <tr>
                <th>Earnings</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Earnings from HITs</td>
                <td>{formatAsCurrency(accountInfo.lifetimeHitEarnings)}</td>
              </tr>
              <tr>
                <td>Earnings from Bonuses</td>
                <td>{formatAsCurrency(accountInfo.lifetimeBonusEarnings)}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  <TextStyle variation="strong">
                    {formatAsCurrency(accountInfo.lifetimeTotalEarnings)}
                  </TextStyle>
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Section>
        <Card.Section>
          <table className="pt-table pt-condensed">
            <thead>
              <tr>
                <th>Hit Statistics</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Submitted</td>
                <td>{accountInfo.lifetimeSubmitted.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Approved</td>
                <td>{accountInfo.lifetimeApproved.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Rejected</td>
                <td>{accountInfo.lifetimeRejected.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Acceptance Rate</td>
                <td>
                  {calculateAcceptanceRate(
                    accountInfo.lifetimeSubmitted,
                    accountInfo.lifetimeRejected
                  ).toFixed(3)}%
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Section>
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  accountInfo: state.account
});

export default connect(mapState)(AccountStatisticsTable);
