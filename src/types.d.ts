import * as Immutable from 'immutable';

export interface RootState {
  hits: HitTableEntry[];
  requesters: Immutable.Map<string, Requester>;
}

export interface SearchParams {
  readonly selectedSearchType: string;
  readonly sortType: string;
  readonly pageSize: number;
  readonly minReward: number;
  readonly qualifiedFor: 'on' | 'off';
}

export interface HitTableEntry {
  title: string;
  requesterName: string;
  requesterId: string;
  reward: string;
  groupId: string;
  turkopticon?: Requester;
}

export interface TOpticonApiResponse {
  name: string;
  attrs: RequesterScores;
  reviews: number;
  tos_flags: number;
}

export interface RequesterScores {
  comm?: string;
  pay?: string;
  fair?: string;
  fast?: string;
}

/**
 * Each string should be parseFloat()-able into a number.
 */
export interface Requester extends TOpticonApiResponse {
  id?: string;
}
