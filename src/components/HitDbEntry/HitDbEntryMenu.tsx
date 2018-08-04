import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import * as React from 'react';
import { HitDatabaseEntry } from 'types';
import { handleCopy } from 'utils/clipboard';

interface Props {
  readonly hit: HitDatabaseEntry;
}

class HitDbEntryMenu extends React.PureComponent<Props, never> {
  public render() {
    const {
      hit: { title, id, requester }
    } = this.props;
    return (
      <Menu>
        <MenuDivider title="Copy..." />
        <MenuItem
          icon="duplicate"
          onClick={handleCopy(title, `"${title}" copied to clipboard.`)}
          text="HIT title"
        />
        <MenuItem
          icon="duplicate"
          onClick={handleCopy(id, `"${id}" copied to clipboard.`)}
          text="HIT ID"
        />
        <MenuItem
          icon="duplicate"
          onClick={handleCopy(
            requester.name,
            `"${requester.name}" copied to clipboard.`
          )}
          text="Requester name"
        />
        <MenuItem
          icon="duplicate"
          onClick={handleCopy(
            requester.id,
            `Requester ID copied to clipboard.`
          )}
          text="Requester ID"
        />
      </Menu>
    );
  }
}

export default HitDbEntryMenu;
