import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, TOpticonSettings } from '../../types';
import { FormUpdate, updateForm } from '../../actions/form';
import { TextField } from '@shopify/polaris';
import { Dispatch } from 'redux';

interface Props {
  readonly value: string;
}

interface Handlers {
  readonly onChange: (value: string) => void;
}

const createMapDispatchFn = (field: keyof TOpticonSettings) => (
  dispatch: Dispatch<FormUpdate<TOpticonSettings>>
): Handlers => ({
  onChange: (value: string) => {
    dispatch(
      updateForm<TOpticonSettings>(
        'topticonSettings',
        field,
        Math.max(+value, 0)
      )
    );
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
        step={1}
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
        min={0}
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
        step={1}
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
        min={0}
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
        step={1}
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
        min={0}
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
        step={1}
        autoComplete={false}
        value={this.props.value}
        onChange={this.props.onChange}
        min={0}
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
