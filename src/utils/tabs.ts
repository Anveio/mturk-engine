interface TabDescriptor {
  id: string;
  url?: string;
  title: string;
  panelID?: string;
  accessibilityLabel?: string;
}

interface TabSizes {
  searchSize: number;
  queueSize: number;
}

export const generateTabs = ({ searchSize, queueSize }: TabSizes): TabDescriptor[] => {
  return [
    {
      id: 'Search',
      title: `Search (${searchSize})`,
      panelID: 'search',
      accessibilityLabel: 'Search tab'
    },
    {
      id: 'Queue',
      title: `Queue (${queueSize})`,
      panelID: 'queue',
      accessibilityLabel: 'Queue tab'
    }
  ];
};
