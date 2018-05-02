import * as React from 'react';
import { connect } from 'react-redux';
import { Card, TextStyle } from '@shopify/polaris';
import { RootState, MaybeAccount } from '../../types';
import { formatAsUsd } from '../../utils/formatting';
import { calculateAcceptanceRate } from 'utils/hitDatabase';
import { CONDENSED_TABLE } from 'constants/blueprint';

interface Props {
  readonly accountInfo: MaybeAccount;
}

class AccountStatisticsTable extends React.PureComponent<Props, never> {
  private static AcceptanceRateText: React.SFC<{
    readonly lifetimeSubmitted: number;
    readonly lifetimeRejected: number;
  }> = props => {
    const acceptanceRate = calculateAcceptanceRate(
      props.lifetimeSubmitted,
      props.lifetimeRejected
    );

    return acceptanceRate > 99 ? (
      <TextStyle variation="positive">{acceptanceRate.toFixed(3)}%</TextStyle>
    ) : (
      <span>{acceptanceRate.toFixed(3)}%</span>
    );
  };

  public render() {
    const { accountInfo } = this.props;
    return (
      accountInfo && (
        <Card title="Account Statistics">
          <Card.Section>
            <table className={CONDENSED_TABLE}>
              <thead>
                <tr>
                  <th>Earnings</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Earnings from HITs</td>
                  <td>{formatAsUsd(accountInfo.lifetimeHitEarnings)}</td>
                </tr>
                <tr>
                  <td>Earnings from Bonuses</td>
                  <td>{formatAsUsd(accountInfo.lifetimeBonusEarnings)}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                    <TextStyle variation="strong">
                      {formatAsUsd(accountInfo.lifetimeTotalEarnings)}
                    </TextStyle>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card.Section>
          <Card.Section>
            <table className={CONDENSED_TABLE}>
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
                    <AccountStatisticsTable.AcceptanceRateText
                      {...accountInfo}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Card.Section>
        </Card>
      )
    );
  }
}

const mapState = (state: RootState): Props => ({
  accountInfo: state.account
});

export default connect(mapState)(AccountStatisticsTable);
