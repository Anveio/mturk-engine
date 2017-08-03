interface SearchParams {
  readonly selectedSearchType: string;
  readonly sortType: string;
  readonly pageSize: number;
  readonly minReward: number;
  readonly qualifiedFor: 'on' | 'off';
}

interface HitTableEntry {
  title: string;
  requester: string;
  requesterId: string;
  reward: string;
  groupId: string;
}
