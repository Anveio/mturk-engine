import * as Immutable from 'immutable';

export interface RootState {
  readonly hits: HitMap;
  readonly requesters: RequesterMap;
  readonly searchOptions: SearchOptions;
  readonly searchFormActive: boolean;
}

export type HitMap = Immutable.Map<string, Hit>;
export type RequesterMap = Immutable.Map<string, Requester>;

export type HitSorting = 'Latest' | 'Batch Size' | 'Reward';
export interface SearchOptions {
  readonly delay: string;
  readonly minReward: string;
  readonly sortType: HitSorting;
  readonly qualified: boolean;
}

export interface Hit {
  readonly title: string;
  readonly requesterName: string;
  readonly requesterId: string;
  readonly reward: string;
  readonly groupId: string;
  readonly batchSize: number;
  readonly turkopticon?: Requester;
  readonly time: number;
}

export interface TOpticonResponse {
  readonly name: string;
  readonly attrs: RequesterScores;
  readonly reviews: number;
  readonly tos_flags: number;
}

export interface RequesterScores {
  readonly comm?: string;
  readonly pay?: string;
  readonly fair?: string;
  readonly fast?: string;
}

/**
 * Each string should be parseFloat()-able into a number.
 */
export interface Requester extends TOpticonResponse {
  readonly id?: string;
}
