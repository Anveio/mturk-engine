import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import * as copy from 'copy-to-clipboard';
import * as React from 'react';
import { HumanIntelligenceTask, QueueItem } from 'types';
import { generateHwtfUrl, generateMarkdownExport } from 'utils/export';
import { showPlainToast } from 'utils/toaster';
import { generateContactLinkQueue } from 'utils/urls';

interface Props {
  readonly hit: HumanIntelligenceTask;
  readonly queueItem?: QueueItem;
}

class HitActionMenu extends React.PureComponent<Props, never> {
  private static handleCopy = (copyText: string, toastText: string) => () => {
    copy(copyText);
    showPlainToast(toastText);
  };

  public render() {
    const { hit, queueItem } = this.props;
    return (
      <Menu>
        {queueItem && (
          <React.Fragment>
            <MenuDivider title="Contact" />
            <MenuItem
              icon="person"
              target="_blank"
              text="Contact Requester"
              href={generateContactLinkQueue(queueItem)}
            />
          </React.Fragment>
        )}
        <MenuDivider title="Copy" />
        <MenuItem
          icon="duplicate"
          onClick={HitActionMenu.handleCopy(
            generateMarkdownExport(hit),
            `Markdown for "${hit.title}" copied clipboard.`
          )}
          text="Markdown"
        />
        <MenuItem
          icon="duplicate"
          onClick={HitActionMenu.handleCopy(
            hit.title,
            `"${hit.title}" copied to clipboard.`
          )}
          text="HIT title"
        />
        <MenuItem
          icon="duplicate"
          onClick={HitActionMenu.handleCopy(
            hit.requester.name,
            `"${hit.requester.name}" copied to clipboard.`
          )}
          text="Requester name"
        />
        <MenuItem
          icon="duplicate"
          onClick={HitActionMenu.handleCopy(
            hit.requester.id,
            `Requester ID copied to clipboard.`
          )}
          text="Requester ID"
        />
        <MenuDivider title="Share" />
        <MenuItem
          icon="share"
          href={generateHwtfUrl(hit)}
          target="_blank"
          text="Post to HWTF"
        />
      </Menu>
    );
  }
}

export default HitActionMenu;
