import * as React from 'react';
import CrashScreen from './CrashScreen';

interface State {
  readonly error: boolean;
  readonly errorDetails?: Error;
}

class ErrorBoundary extends React.PureComponent<{}, State> {
  public readonly state: State = { error: false };

  componentDidCatch(errorDetails: Error) {
    this.setState(() => ({
      error: true,
      errorDetails
    }));
  }

  public render() {
    const { error, errorDetails } = this.state;

    return error && !!errorDetails ? (
      <CrashScreen errorDetails={errorDetails} />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
