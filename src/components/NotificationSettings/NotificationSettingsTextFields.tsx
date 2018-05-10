import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, NotificationSettings } from '../../types';
import { TextField } from '@shopify/polaris';
import { EditableNotificationField } from '../../actions/notifications';
import { FormUpdate, updateForm } from '../../actions/form';

interface Props {
  readonly value: number;
}

interface Handlers {
  readonly onChange: (value: number) => void;
}

interface State {
  readonly value: string;
  readonly error?: string;
}

const createMapDispatchFn = (field: keyof NotificationSettings) => (
  dispatch: Dispatch<FormUpdate<NotificationSettings>>
): Handlers => ({
  onChange: (value: number) => {
    dispatch(
      updateForm<NotificationSettings>('notificationSettings', field, value)
    );
  }
});

const createMapStateFn = (field: EditableNotificationField) => (
  state: RootState
) => ({
  value: state.notificationSettings[field]
});

class NotificationThresholdField extends React.PureComponent<
  Props & Handlers,
  State
> {
  constructor(props: Props & Handlers) {
    super(props);
    this.state = {
      value: props.value.toString()
    };
  }

  private handleChange = (value: string) => {
    this.setState({ value, error: undefined });
    this.setErrorIfAny(value);
    this.props.onChange(Math.max(+value, 0) || 0);
  };

  private setErrorIfAny = (value: string) => {
    if (+value < 0) {
      this.setState({
        error: 'Minimum reward cannot be negative.'
      });
    }
  };

  public render() {
    return (
      <TextField
        id="edit-notification-threshold"
        label="Minimum Reward"
        helpText="Only HITs rewarding at least this amount will be sent to your desktop."
        type="number"
        prefix="$"
        step={0.05}
        autoComplete={false}
        spellCheck={false}
        value={this.state.value}
        onChange={this.handleChange}
        min={0}
        error={this.state.error || undefined}
      />
    );
  }
}

class NotificationDurationField extends React.PureComponent<
  Props & Handlers,
  State
> {
  constructor(props: Props & Handlers) {
    super(props);
    this.state = {
      value: props.value.toString()
    };
  }

  private handleChange = (value: string) => {
    this.setState({ value, error: undefined });
    this.setErrorIfAny(value);
    this.props.onChange(Math.max(+value, 0) || 1);
  };

  private setErrorIfAny = (value: string) => {
    if (+value < 1) {
      this.setState({
        error: 'Duration must be at least 1 second.'
      });
    }
  };

  public render() {
    return (
      <TextField
        id="edit-notification-duration"
        label="Notification Duration"
        type="number"
        suffix="seconds"
        step={1}
        autoComplete={false}
        spellCheck={false}
        value={this.state.value}
        onChange={this.handleChange}
        min={1}
        error={this.state.error}
      />
    );
  }
}

export const EditNotificationThresholdField = connect(
  createMapStateFn('minReward'),
  createMapDispatchFn('minReward')
)(NotificationThresholdField);

export const EditNotificationDurationField = connect(
  createMapStateFn('durationInSeconds'),
  createMapDispatchFn('durationInSeconds')
)(NotificationDurationField);
