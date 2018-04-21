import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { Button, Intent } from '@blueprintjs/core';
import { SMALL_MINIMAL_BUTTON } from 'constants/blueprint';
import { showPlainToast } from 'utils/toaster';

interface Props {
  readonly copyText: string;
  readonly primary?: boolean;
  readonly buttonText?: string;
  readonly toastText?: string;
}

class CopyTextButton extends React.PureComponent<Props, never> {
  private copyOnClick = (textToCopy: string) => () => {
    copy(textToCopy);
    const { toastText } = this.props;
    toastText
      ? showPlainToast(toastText)
      : showPlainToast(`${textToCopy}" copied to clipboard.`);
  };

  public render() {
    const { primary, buttonText, copyText } = this.props;
    return (
      <Button
        intent={primary ? Intent.PRIMARY : Intent.NONE}
        className={SMALL_MINIMAL_BUTTON}
        rightIcon="duplicate"
        onClick={this.copyOnClick(copyText)}
      >
        {buttonText || copyText}
      </Button>
    );
  }
}

export default CopyTextButton;
