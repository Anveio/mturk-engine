import * as React from 'react';
import { Button } from '@shopify/polaris';
import { Popover, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import * as copy from 'copy-to-clipboard';
import { SearchResult } from '../../types';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { generateHwtfUrl } from '../../utils/export';
import { generateContactLinkSearchResult } from '../../utils/urls';

const mapState = (state: RootState, ownProps: Props): Props => ({
  hit: ownProps.hit
});

import { generateMarkdownExport } from '../../utils/export';
import { plainToast } from '../../utils/toaster';

interface Props {
  readonly hit: SearchResult;
}

class MiscActionsPopOver extends React.PureComponent<Props, never> {
  private static handleCopyMarkDown = (hit: SearchResult) => () => {
    {
      copy(generateMarkdownExport(hit));
      plainToast(`Markdown for "${hit.title}" was added to your clipboard.`);
    }
  };

  public render() {
    const { hit } = this.props;
    return (
      <Popover>
        <Button size="slim" icon="horizontalDots" />
        <Menu>
          <MenuDivider title="HIT Actions" />
          <MenuItem
            iconName="person"
            target="_blank"
            text="Contact Requester"
            href={generateContactLinkSearchResult(hit)}
          />
          <MenuDivider title="Share" />
          <MenuItem
            iconName="share"
            href={generateHwtfUrl(hit)}
            target="_blank"
            text="Post to HWTF"
          />
          <MenuItem
            iconName="duplicate"
            onClick={MiscActionsPopOver.handleCopyMarkDown(hit)}
            text="Copy to Clipboard"
          />
        </Menu>
      </Popover>
    );
  }
}

export default connect(mapState)(MiscActionsPopOver);
