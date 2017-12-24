import * as React from 'react';
import { FooterHelp, Link } from '@shopify/polaris';

export interface Props {}

class Footer extends React.PureComponent<Props, never> {
  public render() {
    return (
      <FooterHelp>
        The new Worker website is constantly changing, and changes can break
        Mturk Engine.{' '}
        <Link external url="https://github.com/Anveio/mturk-engine/issues">
          Visit Mturk Engine's GitHub page to submit issues.
        </Link>
      </FooterHelp>
    );
  }
}

export default Footer;
