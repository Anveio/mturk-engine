import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, TOpticonSettings } from '../../../types';
import { FormAction, updateForm } from '../../../actions/form';
import { TextField } from '@shopify/polaris';

interface Props {
  readonly value: string;
}

interface Handlers {
  readonly onChange: (value: string) => void;
}

const createMapDispatchFn = (field: keyof TOpticonSettings) => (
  dispatch: Dispatch<FormAction<TOpticonSettings>>
): Handlers => ({
  onChange: (value: string) => {
    dispatch(updateForm<TOpticonSettings>('topticonSettings', field, value));
  }
});

const createMapStateFn = (field: keyof TOpticonSettings) => (
  state: RootState
) => ({
  value: (state.topticonSettings[field] as number).toString()
});

class PayWeightTOField extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <TextField
        label="Pay"
        type="number"
        step={0.1}
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class FairWeightTOField extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <TextField
        label="Fair"
        type="number"
        step={0.1}
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class CommWeightTOField extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <TextField
        label="Communication"
        type="number"
        step={0.1}
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class FastWeightTOField extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <TextField
        label="Fast"
        type="number"
        step={0.1}
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

const ConnectedPayWeightField = connect(
  createMapStateFn('payWeight'),
  createMapDispatchFn('payWeight')
)(PayWeightTOField);

const ConnectedFairWeightField = connect(
  createMapStateFn('fairWeight'),
  createMapDispatchFn('fairWeight')
)(FairWeightTOField);

const ConnectedFastWeightField = connect(
  createMapStateFn('fastWeight'),
  createMapDispatchFn('fastWeight')
)(FastWeightTOField);

const ConnectedCommWeightField = connect(
  createMapStateFn('commWeight'),
  createMapDispatchFn('commWeight')
)(CommWeightTOField);

export {
  ConnectedPayWeightField,
  ConnectedFairWeightField,
  ConnectedFastWeightField,
  ConnectedCommWeightField
};
