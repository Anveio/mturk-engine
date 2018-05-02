import * as React from 'react';
import { Callout } from '@blueprintjs/core';
// import { IconNames } from '@blueprintjs/icons';

const InfoCallout = () => {
  return (
    <Callout icon="info-sign">
      You can start or stop a watcher by double clicking on it in the watcher
      menu.
    </Callout>
  );
};

export default InfoCallout;
