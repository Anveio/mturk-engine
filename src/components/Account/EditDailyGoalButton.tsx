import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Popover, Button } from '@blueprintjs/core';
import {
  Card,
  FormLayout,
  TextField,
  Button as PolarisButton
} from '@shopify/polaris';
import { RootState } from '../../types';
import { ChangeDailyGoal, changeDailyGoal } from '../../actions/updateValue';
import { formatAsCurrency } from '../../utils/formatting';
import { validatePositiveNumber } from '../../utils/validation';
import { TopRightToaster } from '../../utils/toaster';

export interface Props {
  readonly dailyEarningsGoal: number;
}

export interface Handlers {
  readonly onChange: (value: number) => void;
}

export interface State {
  readonly value: string;
  readonly error?: string;
  readonly isOpen: boolean;
}

class EditDailyGoalButton extends React.PureComponent<Props & Handlers, State> {
  constructor(props: Props & Handlers) {
    super(props);

    this.state = {
      value: props.dailyEarningsGoal.toFixed(2),
      isOpen: false
    };
  }

  private watchForEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.charCode === 13) {
      this.handleSubmit();
    }
  };

  private toggleOpen = () =>
    this.setState((prevState: State): Partial<State> => ({
      isOpen: !prevState.isOpen
    }));

  private handleSubmit = () => {
    const { value } = this.state;
    validatePositiveNumber(value)
      ? this.handleSuccessfulSubmit(value)
      : this.setState((prevState: State): Partial<State> => ({
          value: prevState.value,
          error: `That's not a valid number`
        }));
  };

  private handleSuccessfulSubmit = (value: string) => {
    this.props.onChange(parseFloat(value));
    TopRightToaster.show({
      message: `Daily goal of ${formatAsCurrency(parseFloat(value))} was set.`,
      timeout: 2000
    });
    this.setState((): Partial<State> => ({
      value,
      isOpen: false,
      error: undefined
    }));
  };

  private handleInput = (value: string) => {
    this.setState((): Partial<State> => ({
      value,
      error: undefined
    }));
  };

  public render() {
    return (
      <Popover isOpen={this.state.isOpen}>
        <Button
          onClick={this.toggleOpen}
          intent={0}
          className="pt-button pt-small pt-minimal"
          iconName="manually-entered-data"
        >
          Edit daily goal
        </Button>
        <Card sectioned title="Enter a new daily goal.">
          <div onKeyPress={this.watchForEnter}>
            <FormLayout>
              <TextField
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

const mapDispatch = (dispatch: Dispatch<ChangeDailyGoal>): Handlers => ({
  onChange: (value: number) => dispatch(changeDailyGoal(value))
});

export default connect(mapState, mapDispatch)(EditDailyGoalButton);
