import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { Intent, Button } from '@blueprintjs/core';
import { SMALL_MINIMAL_BUTTON } from 'constants/blueprint';
import { showPlainToast } from 'utils/toaster';

interface Props {
  readonly copyText: string;
  readonly primary?: boolean;
  readonly buttonText?: string;
  readonly toastText?: string;
  readonly textOnly?: boolean;
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
    const { primary, buttonText, copyText, textOnly } = this.props;
    return (
      <Button
        className={SMALL_MINIMAL_BUTTON}
        intent={primary ? Intent.PRIMARY : Intent.NONE}
        rightIcon={textOnly ? undefined : 'duplicate'}
        onClick={this.copyOnClick(copyText)}
      >
        {buttonText !== undefined ? buttonText : copyText}
      </Button>
    );
  }
}

export default CopyTextButton;
