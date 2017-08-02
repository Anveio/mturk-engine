interface SearchParams {
  readonly selectedSearchType: string;
  readonly sortType: string;
  readonly pageSize: number;
  readonly minReward: number;
  readonly qualifiedFor: 'on' | 'off';
}

interface HitTableEntry {
  requester: string;
  requesterId: string;
  reward: number;
  description: string;
  groupId: string;
  pandaLink: string;
  previewLink: string;
}
