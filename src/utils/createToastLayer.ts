import { Toaster, Position } from '@blueprintjs/core';

export const createToastLayer = () =>
  Toaster.create({
    position: Position.TOP_RIGHT
  });
