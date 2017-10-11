import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Popover, Button } from '@blueprintjs/core';
import {
  Card,
  FormLayout,
  TextField,
  Button as PolarisButton
} from '@shopify/polaris';
import { validatePositiveNumber } from '../../../utils/validation';
import { formatAsCurrency } from '../../../utils/formatting';
import { EditBonus, editBonus } from '../../../actions/bonus';
import { TopRightToaster } from '../../../utils/toaster';

export interface OwnProps {
  readonly bonus: number;
  readonly hitId: string;
}

export interface Handlers {
  readonly onEditBonus: (id: string, value: number) => void;
}

export interface State {
  readonly value: string;
  readonly error?: string;
  readonly isOpen: boolean;
}

class EditBonusButton extends React.PureComponent<OwnProps & Handlers, State> {
  constructor(props: OwnProps & Handlers) {
    super(props);

    this.state = {
      value: props.bonus.toFixed(2),
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
          error: `That's not a valid bonus.`
        }));
  };

  private handleSuccessfulSubmit = (value: string) => {
    this.props.onEditBonus(this.props.hitId, parseFloat(value));
    TopRightToaster.show({
      message: `Bonus of ${formatAsCurrency(
        parseFloat(value)
      )} was set for this HIT.`,
      timeout: 2000
    });
    this.setState((): Partial<State> => ({
      value,
      error: undefined,
      isOpen: false
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
          Edit bonus
        </Button>
        <Card sectioned title="Enter a new bonus.">
          <div onKeyPress={this.watchForEnter}>
            <FormLayout>
              <TextField
                label="Bonus"
                value={this.state.value}
                type="number"
                onChange={this.handleInput}
                min={0}
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

const mapDispatch = (dispatch: Dispatch<EditBonus>): Handlers => ({
  onEditBonus: (id: string, value: number) => dispatch(editBonus(id, value))
});

export default connect(null, mapDispatch)(EditBonusButton);
