import * as React from 'react';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import * as copy from 'copy-to-clipboard';
import { HumanIntelligenceTask, QueueItem } from 'types';
import { connect } from 'react-redux';
import { RootState } from 'types';
import { generateHwtfUrl } from 'utils/export';
import { generateMarkdownExport } from 'utils/export';
import { showPlainToast } from 'utils/toaster';
import { generateContactLinkQueue } from 'utils/urls';

const mapState = (state: RootState, ownProps: Props): Props => ({
  hit: ownProps.hit
});

interface Props {
  readonly hit: QueueItem;
}

class SearchResultMenu extends React.PureComponent<Props, never> {
  private static handleCopyMarkDown = (hit: HumanIntelligenceTask) => () => {
    copy(generateMarkdownExport(hit));
    showPlainToast(`Markdown for "${hit.title}" was added to your clipboard.`);
  };

  public render() {
    const { hit } = this.props;
    return (
      <Menu>
        <MenuDivider title="HIT Actions" />
        <MenuItem
          icon="person"
          target="_blank"
          text="Contact Requester"
          href={generateContactLinkQueue(hit)}
        />
        <MenuDivider title="Share" />
        <MenuItem
          icon="share"
          href={generateHwtfUrl(hit)}
          target="_blank"
          text="Post to HWTF"
        />
        <MenuItem
          icon="duplicate"
          onClick={SearchResultMenu.handleCopyMarkDown(hit)}
          text="Copy to Clipboard"
        />
      </Menu>
    );
  }
}

export default connect(mapState)(SearchResultMenu);
