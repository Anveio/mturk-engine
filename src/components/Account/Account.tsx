import * as React from "react";
import { MaybeAccount, RootState } from "../../types";
import { connect } from "react-redux";
import DisconectedAccount from "./DisconnectedAccount";
import ConnectedAccountLayout from "./ConnectedAccountLayout";
import { connectAccountRequest } from "../../actions/connectAccount";
import { TabIndex } from "constants/enums";

interface Props {
  readonly selectedTabIndex: number;
  readonly account: MaybeAccount;
}

interface Handlers {
  readonly onConnect: () => void;
}

class Account extends React.PureComponent<Props & Handlers, never> {
  componentDidUpdate(nextProps: Props & Handlers) {
    const { selectedTabIndex, account, onConnect } = this.props;
    if (
      selectedTabIndex !== nextProps.selectedTabIndex &&
      account &&
      selectedTabIndex === TabIndex.ACCOUNT
    ) {
      onConnect();
    }
  }

  public render() {
    return this.props.account ? (
      <ConnectedAccountLayout />
    ) : (
      <DisconectedAccount />
    );
  }
}

const mapState = (state: RootState): Props => ({
  selectedTabIndex: state.tab,
  account: state.account
});

const mapDispatch: Handlers = {
  onConnect: connectAccountRequest
};

export default connect(
  mapState,
  mapDispatch
)(Account);
