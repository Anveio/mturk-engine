import { Map } from 'immutable';
import { ToastrState } from 'react-redux-toastr';

export interface RootState {
  readonly tab: number;
  readonly queue: QueueMap;
  readonly search: SearchResults;
  readonly toastr: ToastrState;
  readonly requesters: RequesterMap;
  readonly searchingActive: boolean;
  readonly waitingForMturk: boolean;
  readonly searchFormActive: boolean;
  readonly timeNextSearch: Date | null;
  readonly searchOptions: SearchOptions;
  readonly sortingOption: SortingOption;
  readonly topticonSettings: TOpticonSettings;
  readonly hitBlocklist: HitBlockMap;
  readonly watchers: WatcherMap;
  readonly requesterBlocklist: RequesterBlockMap;
}

export type SearchResults = Map<string, SearchResult>;
export type QueueMap = Map<string, QueueItem>;
export type RequesterMap = Map<string, Requester>;
export type HitBlockMap = Map<string, BlockedHit>;
export type RequesterBlockMap = Map<string, BlockedRequester>;
export type TOpticonMap = Map<string, TOpticonData>;
export type WatcherMap = Map<string, Watcher>;

export type FormTarget = 'searchOptions' | 'topticonSettings';

export type SearchSort = 'Latest' | 'Batch Size' | 'Reward';
export interface SearchOptions {
  readonly searchTerm: string;
  readonly delay: string;
  readonly minReward: string;
  readonly sortType: SearchSort;
  readonly qualifiedOnly: boolean;
}

export type SortingOption = 'Batch Size' | 'Reward' | 'Latest';

export interface HumanIntelligenceTask {
  readonly title: string;
  readonly requester: Requester;
  readonly reward: string;
  readonly groupId: string;
  readonly batchSize: number;
  readonly qualified: boolean;
  readonly description: string;
  readonly timeAllotted: string;
  readonly qualsRequired: string[];
}

export interface SearchResult extends HumanIntelligenceTask {
  readonly index: number;
  readonly expanded?: boolean;
}

export interface QueueItem {
  readonly title: string;
  readonly requesterName: string;
  readonly hitId: string;
  readonly reward: string;
  readonly timeLeft: string;
}

export interface BlockedHit extends SearchResult {
  readonly dateBlocked: Date;
}

export interface Requester {
  readonly id: string;
  readonly name: string;
  readonly turkopticon?: TOpticonData;
}

export interface BlockedRequester extends Requester {
  readonly dateBlocked: Date;
}

export interface TOpticonData {
  readonly name: string;
  readonly attrs: RequesterScores;
  readonly reviews: number;
  readonly tos_flags: number;
}

export interface TOpticonResponse {
  [id: string]: TOpticonData;
}

export interface RequesterScores {
  readonly comm?: string;
  readonly pay?: string;
  readonly fair?: string;
  readonly fast?: string;
}

export interface TOpticonSettings {
  readonly hideBelowThresholdEnabled: boolean;
  readonly hideNoToEnabled: boolean;
  readonly minimumWeightedTO: number;
  readonly payWeight: number;
  readonly fairWeight: number;
  readonly commWeight: number;
  readonly fastWeight: number;
}

export interface Watcher {
  readonly title: string;
  readonly groupId: string;
  readonly delay: number;
  readonly active: boolean;
  readonly createdOn: Date;
  readonly timeNextAttempt: Date | null;
  readonly hit?: HumanIntelligenceTask;
}
