import * as React from 'react';
import { Callout } from '@blueprintjs/core';

const InfoCallout = () => {
  return (
    <Callout className={'pt-icon-info-sign'}>
      You can start or stop a watcher by double clicking on it in the watcher
      menu.
    </Callout>
  );
};

export default InfoCallout;
