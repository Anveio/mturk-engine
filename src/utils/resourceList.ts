import { RESOURCE_LIST_ITEM_CLASS } from 'constants/misc';

export const clickDidNotOccurOnActionButton = (
  e: React.MouseEvent<HTMLDivElement>
): boolean =>
  (e.target as Element).getAttribute('class') === RESOURCE_LIST_ITEM_CLASS;
