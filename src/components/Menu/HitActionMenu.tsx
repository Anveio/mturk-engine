import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import * as React from 'react';
import { HumanIntelligenceTask, QueueItem } from 'types';
import { generateHwtfUrl, generateMarkdownExport } from 'utils/export';
import { generateContactLinkQueue } from 'utils/urls';
import { handleCopy } from 'utils/clipboard';

interface Props {
  readonly hit: HumanIntelligenceTask;
  readonly queueItem?: QueueItem;
}

class HitActionMenu extends React.PureComponent<Props, never> {
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
          onClick={handleCopy(
            generateMarkdownExport(hit),
            `Markdown for "${hit.title}" copied clipboard.`
          )}
          text="Markdown"
        />
        <MenuItem
          icon="duplicate"
          onClick={handleCopy(hit.title, `"${hit.title}" copied to clipboard.`)}
          text="HIT title"
        />
        <MenuItem
          icon="duplicate"
          onClick={handleCopy(
            hit.requester.name,
            `"${hit.requester.name}" copied to clipboard.`
          )}
          text="Requester name"
        />
        <MenuItem
          icon="duplicate"
          onClick={handleCopy(
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
