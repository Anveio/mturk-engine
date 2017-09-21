import * as React from 'react';
import { FooterHelp, Link } from '@shopify/polaris';

export interface Props {}

class Footer extends React.PureComponent<Props, never> {
  public render() {
    return (
      <FooterHelp>
        Issues? Feature suggestions? {' '}
        <Link external url="https://github.com/Anveio/mturk-engine/issues">
          Visit Mturk Engine's GitHub page to submit them.
        </Link>
      </FooterHelp>
    );
  }
}

export default Footer;
