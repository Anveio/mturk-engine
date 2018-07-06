import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Popover, Button, Intent } from '@blueprintjs/core';
import {
  Card,
  FormLayout,
  TextField,
  Button as PolarisButton
} from '@shopify/polaris';
import { RootState } from '../../types';
import { changeDailyGoal } from '../../actions/updateValue';

import { validatePositiveNumber } from '../../utils/validation';
import { successfulEditDailyGoalToast } from '../../utils/toaster';
import { watchForEnter } from '../../utils/watchForEnter';
import { SMALL_MINIMAL_BUTTON } from 'constants/blueprint';

export interface Props {
  readonly dailyEarningsGoal: number;
}

interface Handlers {
  readonly onChange: (value: number) => void;
}

interface State {
  readonly value: string;
  readonly isOpen: boolean;
  readonly error?: string;
}

class EditDailyGoalButton extends React.PureComponent<Props & Handlers, State> {
  constructor(props: Props & Handlers) {
    super(props);

    this.state = {
      value: props.dailyEarningsGoal.toFixed(2),
      isOpen: false
    };
  }

  private toggleOpen = (nextState: boolean) =>
    this.setState(() => ({
      isOpen: nextState
    }));

  private handleSubmit = () => {
    const { value } = this.state;
    validatePositiveNumber(value)
      ? this.handleSuccessfulSubmit(value)
      : this.setState((prevState: State) => ({
          value: prevState.value,
          error: `That's not a valid number`
        }));
  };

  private handleEnterKeyPress = watchForEnter<HTMLDivElement>(
    this.handleSubmit
  );

  private handleSuccessfulSubmit = (value: string) => {
    this.props.onChange(parseFloat(value));
    successfulEditDailyGoalToast(value);
    this.setState(() => ({
      value,
      isOpen: false,
      error: undefined
    }));
  };

  private handleInput = (value: string) => {
    this.setState(() => ({
      value,
      error: undefined
    }));
  };

  public render() {
    return (
      <Popover
        isOpen={this.state.isOpen}
        onInteraction={(nextState: boolean) => this.toggleOpen(nextState)}
      >
        <Button
          intent={Intent.PRIMARY}
          className={SMALL_MINIMAL_BUTTON}
          icon="manually-entered-data"
        >
          Edit daily goal
        </Button>
        <Card sectioned title="Enter a new daily goal.">
          <div onKeyPress={this.handleEnterKeyPress}>
            <FormLayout>
              <TextField
                id="edit-daily-goal"
                label="Daily Goal"
                min={0}
                value={this.state.value}
                type="number"
                onChange={this.handleInput}
                step={0.05}
                prefix="$"
                error={this.state.error}
                helpText="Changes will apply after saving."
                autoComplete={false}
                autoFocus
              />
              <PolarisButton onClick={this.handleSubmit}>Save</PolarisButton>
            </FormLayout>
          </div>
        </Card>
      </Popover>
    );
  }
}

const mapState = (state: RootState): Props => ({
  dailyEarningsGoal: state.dailyEarningsGoal
});

const mapDispatch: Handlers = {
  onChange: changeDailyGoal
}

export default connect(mapState, mapDispatch)(EditDailyGoalButton);
