const resourceListItemClass =
  'Polaris-ResourceList__Item Polaris-ResourceList__Item--focused';

export const clickDidNotOccurOnActionButton = (
  e: React.MouseEvent<HTMLDivElement>
): boolean => {
  return (e.target as Element).getAttribute('class') === resourceListItemClass;
};
