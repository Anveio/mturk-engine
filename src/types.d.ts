import { Map } from 'immutable';
import { ToastrState } from 'react-redux-toastr';

export interface RootState {
  readonly account: MaybeAccount;
  readonly tab: number;
  readonly queue: QueueMap;
  readonly toastr: ToastrState;
  readonly watchers: WatcherMap;
  readonly search: SearchResults;
  readonly dailyEarningsGoal: number;
  readonly searchingActive: boolean;
  readonly waitingForMturk: boolean;
  readonly timeNextSearch: Date | null;
  readonly searchOptions: SearchOptions;
  readonly sortingOption: SortingOption;
  readonly hitDatabase: HitDatabaseMap;
  readonly topticonSettings: TOpticonSettings;
  readonly hitBlocklist: HitBlockMap;
  readonly selectedHitDbDate: string | null;
  readonly requesterBlocklist: RequesterBlockMap;
  readonly audioSettingsV1: AudioSettings;
  readonly audioFiles: AudioFiles;
}

export type SearchResults = Map<string, SearchResult>;
export type QueueMap = Map<string, QueueItem>;
export type RequesterMap = Map<string, Requester>;
export type HitBlockMap = Map<string, BlockedHit>;
export type RequesterBlockMap = Map<string, BlockedRequester>;
export type TOpticonMap = Map<string, TOpticonData>;
export type WatcherMap = Map<string, Watcher>;
export type HitDatabaseMap = Map<string, HitDatabaseEntry>;

export type MaybeAccount = AccountInfo | null;

export type FormTarget =
  | 'searchOptions'
  | 'topticonSettings'
  | 'dailyEarningsGoal';

export type SearchSort = 'Latest' | 'Batch Size' | 'Reward';
export interface SearchOptions {
  readonly searchTerm: string;
  readonly delay: string;
  readonly minReward: string;
  readonly sortType: SearchSort;
  readonly qualifiedOnly: boolean;
}

export type SortingOption = 'Batch Size' | 'Reward' | 'Latest';
export type HitStatus = 'Paid' | 'Pending Payment' | 'Rejected' | 'Pending';

export interface AccountInfo {
  readonly id: string;
  readonly fullName: string;
  readonly availableEarnings: number;
  readonly lifetimeHitEarnings: number;
  readonly lifetimeBonusEarnings: number;
  readonly lifetimeTotalEarnings: number;
  readonly lifetimeSubmitted: number;
  readonly lifetimeApproved: number;
  readonly lifetimeRejected: number;
  readonly numPending: number;
}

export interface HumanIntelligenceTask {
  readonly title: string;
  readonly requester: Requester;
  readonly reward: number;
  readonly groupId: string;
  readonly description: string;
}

export interface SearchResult extends HumanIntelligenceTask {
  readonly index: number;
  readonly markedAsRead?: Date;
  readonly expanded?: boolean;
  readonly batchSize: number;
  readonly qualified: boolean;
  readonly timeAllotted: string;
  readonly qualsRequired: string[];
}

export interface HitDatabaseEntry {
  readonly id: string;
  readonly date: string;
  readonly title: string;
  readonly reward: number;
  readonly bonus: number;
  readonly status: HitStatus;
  readonly requester: Requester;
  readonly groupId?: string;
  readonly feedback?: string;
}

export interface QueueItem {
  readonly title: string;
  readonly requesterName: string;
  readonly hitId: string;
  readonly reward: number;
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
  readonly groupId: string;
  readonly title: string;
  readonly delay: number;
  readonly description: string;
  readonly active: boolean;
  readonly createdOn: Date;
  readonly timeNextAttempt: Date | null;
  readonly hit?: HumanIntelligenceTask;
}

export interface AudioSettings {
  readonly enabled: boolean;
  readonly volume: number;
}

export interface AudioFiles {
  readonly audioNewSearch: HTMLAudioElement;
}

export interface HeatMapValue {
  readonly date: string;
  readonly count: number;
}

export type HitAcceptFailureReason =
  | 'Group Empty'
  | 'Unqualified'
  | 'CAPTCHA'
  | 'Unknown';
