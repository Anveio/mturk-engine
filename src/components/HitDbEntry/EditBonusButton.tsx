import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Popover, Button, Intent, Classes } from '@blueprintjs/core';
import {
  Card,
  FormLayout,
  TextField,
  Button as PolarisButton
} from '@shopify/polaris';
import { validatePositiveNumber } from 'utils/validation';
import { formatAsUsd } from 'utils/formatting';
import { EditBonus, editBonus } from 'actions/bonus';
import { successfulEditBonusToast } from 'utils/toaster';
import { watchForEnter } from 'utils/watchForEnter';

interface OwnProps {
  readonly bonus: number;
  readonly hitId: string;
}

interface Handlers {
  readonly onEditBonus: (id: string, value: number) => void;
}

interface State {
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
          error: `That's not a valid bonus.`
        }));
  };

  private handleSuccessfulSubmit = (value: string) => {
    this.props.onEditBonus(this.props.hitId, parseFloat(value));
    successfulEditBonusToast(value);
    this.setState(() => ({
      value,
      error: undefined,
      isOpen: false
    }));
  };

  private handleInput = (value: string) => {
    this.setState(() => ({
      value,
      error: undefined
    }));
  };

  private handleEnterKeyPress = watchForEnter<HTMLDivElement>(
    this.handleSubmit
  );

  private generateButtonText = () =>
    `Bonus: ${formatAsUsd(this.props.bonus)} (Edit)`;

  public render() {
    return (
      <Popover
        isOpen={this.state.isOpen}
        onInteraction={(nextState: boolean) => this.toggleOpen(nextState)}
      >
        <Button
        
          intent={Intent.PRIMARY}
          className={Classes.MINIMAL}
          icon="manually-entered-data"
        >
          {this.generateButtonText()}
        </Button>
        <Card sectioned title="Enter a new bonus.">
          <div onKeyPress={this.handleEnterKeyPress}>
            <FormLayout>
              <TextField
                id="edit-bonus"
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
