interface TabDescriptor {
  id: string;
  url?: string;
  title: string;
  panelID?: string;
  accessibilityLabel?: string;
}

interface TabSizes {
  queueSize: number;
}

export const generateTabs = ({ queueSize }: TabSizes): TabDescriptor[] => {
  return [
    {
      id: 'Search',
      title: `Search`,
      panelID: 'search',
      accessibilityLabel: 'Search tab'
    },
    {
      id: 'Queue',
      title: `Queue (${queueSize})`,
      panelID: 'queue',
      accessibilityLabel: 'Queue tab'
    },
    {
      id: 'Watchers',
      title: 'Watchers',
      panelID: 'watchers',
      accessibilityLabel: 'Watchers tab'
    },
    {
      id: 'Blocklist',
      title: 'Blocklist',
      panelID: 'blocklist',
      accessibilityLabel: 'Blocklist tab'
    },
    {
      id: 'Turkopticon',
      title: 'Turkopticon',
      panelID: 'turkopticon',
      accessibilityLabel: 'Turkopticon tab'
    }
  ];
};
