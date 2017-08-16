interface TabDescriptor {
  id: string;
  url?: string;
  title: string;
  panelID?: string;
  accessibilityLabel?: string;
}

export const tabs: TabDescriptor[] = [
  {
    id: 'Search',
    title: 'Search',
    panelID: 'search',
    accessibilityLabel: 'Search tab'
  },
  {
    id: 'Queue',
    title: 'Queue',
    panelID: 'queue',
    accessibilityLabel: 'Queue tab'
  }
];
