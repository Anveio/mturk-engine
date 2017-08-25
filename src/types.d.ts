import * as Immutable from 'immutable';
import { ToastrState } from 'react-redux-toastr';

export interface RootState {
  readonly tab: number;
  readonly queue: QueueMap;
  readonly toastr: ToastrState;
  readonly search: SearchResults;
  readonly requesters: RequesterMap;
  readonly searchOptions: SearchOptions;
  readonly searchFormActive: boolean;
  readonly sortingOption: SortingOption;
  readonly hitBlocklist: HitBlockMap;
}

export type SearchResults = Immutable.Map<string, SearchItem>;
export type QueueMap = Immutable.Map<string, QueueItem>;
export type RequesterMap = Immutable.Map<string, Requester>;
export type HitBlockMap = Immutable.Map<string, BlockedHit>;

export type SearchSort = 'Latest' | 'Batch Size' | 'Reward';
export interface SearchOptions {
  readonly delay: string;
  readonly minReward: string;
  readonly sortType: SearchSort;
  readonly qualified: boolean;
}

export type SortingOption = 'Batch Size' | 'Reward' | 'Latest';

export interface SearchItem {
  readonly title: string;
  readonly requesterName: string;
  readonly requesterId: string;
  readonly reward: string;
  readonly groupId: string;
  readonly batchSize: number;
  readonly turkopticon?: Requester;
  readonly time: number;
  readonly qualified: boolean;
  readonly timeAlloted: string;
}

export interface QueueItem {
  readonly title: string;
  readonly requesterName: string;
  readonly hitId: string;
  readonly reward: string;
  readonly timeLeft: string;
}

export interface BlockedHit extends SearchItem {
  readonly dateBlocked: Date;
}

export interface Requester {
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
