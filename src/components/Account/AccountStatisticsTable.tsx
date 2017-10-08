import * as React from 'react';
import { Card, TextStyle } from '@shopify/polaris';
import { Tooltip } from '@blueprintjs/core';
import { RootState, MaybeAccount } from '../../types';
import { formatAsCurrency } from '../../utils/formatting';
import { calculateAcceptanceRate } from '../../utils/hitDatabase';
import { connect } from 'react-redux';

export interface Props {
  readonly accountInfo: MaybeAccount;
}

class AccountStatisticsTable extends React.PureComponent<Props, never> {
  static acceptanceRateText = (submitted: number, rejected: number) => {
    const acceptanceRate = calculateAcceptanceRate(submitted, rejected);
    return acceptanceRate > 99 ? (
      <Tooltip content="It's best to keep your acceptance rate above 99%. Good job!">
        <TextStyle variation="positive">{acceptanceRate.toFixed(3)}%</TextStyle>
      </Tooltip>
    ) : (
      <span>{acceptanceRate.toFixed(3)}%</span>
    );
  };

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
                  {AccountStatisticsTable.acceptanceRateText(
                    accountInfo.lifetimeSubmitted,
                    accountInfo.lifetimeRejected
                  )}
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
