import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { Button, Intent } from '@blueprintjs/core';
import { SMALL_MINIMAL_BUTTON } from 'constants/blueprint';
import { showPlainToast } from 'utils/toaster';

interface Props {
  readonly copyText: string;
  readonly buttonText?: string;
}

class CopyTextButton extends React.PureComponent<Props, never> {
  private copyOnClick = (text: string) => () => {
    copy(text);
    showPlainToast(`"${text}" copied to clipboard.`);
  };

  public render() {
    const { buttonText, copyText } = this.props;
    return (
      <Button
        intent={Intent.PRIMARY}
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
