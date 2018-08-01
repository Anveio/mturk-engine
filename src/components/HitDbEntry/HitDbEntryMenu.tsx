import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import * as React from 'react';
import { HitDatabaseEntry } from 'types';
import { handleCopy } from 'utils/clipboard';

interface Props {
  readonly hit: HitDatabaseEntry;
}

class HitDbEntryMenu extends React.PureComponent<Props, never> {
  public render() {
    const { hit } = this.props;
    return (
      <Menu>
        <MenuDivider title="Copy..." />
        <MenuItem
          icon="duplicate"
          onClick={handleCopy(hit.title, `"${hit.title}" copied to clipboard.`)}
          text="HIT title"
        />
        <MenuItem
          icon="duplicate"
          onClick={handleCopy(hit.id, `"${hit.id}" copied to clipboard.`)}
          text="HIT ID"
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
      </Menu>
    );
  }
}

export default HitDbEntryMenu;
