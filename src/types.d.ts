import { Map } from 'immutable';
import { ToastrState } from 'react-redux-toastr';

export interface RootState {
  readonly tab: number;
  readonly queue: QueueMap;
  readonly search: SearchResults;
  readonly toastr: ToastrState;
  readonly scheduler: ScheduleState;
  readonly requesters: RequesterMap;
  readonly searchOptions: SearchOptions;
  readonly searchingActive: boolean;
  readonly searchFormActive: boolean;
  readonly sortingOption: SortingOption;
  readonly hitBlocklist: HitBlockMap;
  readonly timeLastSearch: Date;
}

export type SearchResults = Map<string, SearchItem>;
export type QueueMap = Map<string, QueueItem>;
export type RequesterMap = Map<string, Requester>;
export type HitBlockMap = Map<string, BlockedHit>;

export type SearchSort = 'Latest' | 'Batch Size' | 'Reward';
export interface SearchOptions {
  readonly delay: string;
  readonly minReward: string;
  readonly sortType: SearchSort;
  readonly qualified: boolean;
}

export interface ScheduleState {
  readonly nextSearch: Date | null;
  readonly lastSearch: Date | null;
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
  readonly timeAllotted: string;
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
