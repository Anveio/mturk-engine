import * as React from 'react';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import * as copy from 'copy-to-clipboard';
import { HumanIntelligenceTask, QueueItem } from 'types';
import { generateHwtfUrl } from 'utils/export';
import { generateMarkdownExport } from 'utils/export';
import { showPlainToast } from 'utils/toaster';
import { generateContactLinkQueue } from 'utils/urls';

interface Props {
  readonly hit: HumanIntelligenceTask;
  readonly queueItem?: QueueItem;
}

class HitActionMenu extends React.PureComponent<Props, never> {
  private static handleCopyMarkDown = (hit: HumanIntelligenceTask) => () => {
    copy(generateMarkdownExport(hit));
    showPlainToast(`Markdown for "${hit.title}" was added to your clipboard.`);
  };

  public render() {
    const { hit, queueItem } = this.props;
    return (
      <Menu>
        {queueItem ? (
          <React.Fragment>
            <MenuDivider title="HIT Actions" />
            <MenuItem
              icon="person"
              target="_blank"
              text="Contact Requester"
              href={generateContactLinkQueue(queueItem)}
            />
          </React.Fragment>
        ) : null}
        <MenuDivider title="Share" />
        <MenuItem
          icon="share"
          href={generateHwtfUrl(hit)}
          target="_blank"
          text="Post to HWTF"
        />
        <MenuItem
          icon="duplicate"
          onClick={HitActionMenu.handleCopyMarkDown(hit)}
          text="Copy to Clipboard"
        />
      </Menu>
    );
  }
}

export default HitActionMenu;
