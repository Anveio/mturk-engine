import { Map } from 'immutable';
import {
  WorkerQualification,
  WorkerSubmittedHit,
  WorkerSubmittedHitState
} from './worker-mturk-api';

export interface RootState {
  readonly account: MaybeAccount;
  readonly tab: number;
  readonly queue: QueueMap;
  readonly watchers: WatcherMap;
  readonly search: SearchResults;
  readonly dailyEarningsGoal: number;
  readonly searchingActive: boolean;
  readonly waitingForMturk: boolean;
  readonly waitingForHitDbRefresh: boolean;
  readonly timeNextSearch: Date | null;
  readonly searchOptions: SearchOptions;
  readonly sortingOption: SortingOption;
  readonly hitDatabase: HitDatabaseMap;
  readonly topticonSettings: TOpticonSettings;
  readonly hitBlocklist: HitBlockMap;
  readonly selectedHitDbDate: string | null;
  readonly requesterBlocklist: RequesterBlockMap;
  readonly audioSettingsV1: AudioSettings;
  readonly watcherTimes: WatcherTimerMap;
  readonly audioFiles: AudioFiles;
  readonly uploadedState: Partial<PersistedState> | null;
  readonly expandedSearchResults: ExpandedSearchResultsMap;
  readonly notificationSettings: NotificationSettings;
}

export type SearchResults = Map<string, SearchResult>; // indexed by groupId
export type QueueMap = Map<string, QueueItem>; // indexed by hitId
export type RequesterMap = Map<string, Requester>; // indexed by requesterId
export type HitBlockMap = Map<string, BlockedHit>; // indexed by groupId
export type RequesterBlockMap = Map<string, BlockedRequester>; // indexed by requesterId
export type WatcherMap = Map<string, Watcher>; // indexed by groupId
export type WatcherTimerMap = Map<string, Date>; // indexed by groupId
export type HitDatabaseMap = Map<string, HitDatabaseEntry>; // indexed by LEGACY_DATE_FORMAT string
export type ExpandedSearchResultsMap = Map<string, true>; // indexed by groupId

/**
 * The keys of RootState that are persisted by redux-persist.
 * See `PERSISTED_STATE_WHITELIST` in ./constants/settings
 */
export type PersistedStateKey =
  | 'tab'
  | 'account'
  | 'hitBlocklist'
  | 'hitDatabase'
  | 'requesterBlocklist'
  | 'sortingOption'
  | 'searchOptions'
  | 'topticonSettings'
  | 'watchers'
  | 'audioSettingsV1'
  | 'dailyEarningsGoal'
  | 'notificationSettings';

export type ImmutablePersistedStateKey =
  | 'hitDatabase'
  | 'hitBlocklist'
  | 'watchers'
  | 'requesterBlocklist';

export type ImmutablePersistedDataType =
  | HitBlockMap
  | RequesterBlockMap
  | WatcherMap
  | HitDatabaseMap;

export type PersistedState = Pick<RootState, PersistedStateKey>;
export type ImmutablePersistedState = Pick<
  RootState,
  ImmutablePersistedStateKey
>;

export type MaybeAccount = AccountInfo | null;

export type FormTarget =
  | 'searchOptions'
  | 'topticonSettings'
  | 'useLegacyLinks';

export type SearchSort = 'Latest' | 'Batch Size' | 'Reward';
export interface SearchOptions {
  readonly searchTerm: string;
  readonly delay: string;
  readonly minReward: string;
  readonly sortType: SearchSort;
  readonly qualifiedOnly: boolean;
}

export type SortingOption =
  | 'Batch Size'
  | 'Reward'
  | 'Latest'
  | 'Weighted T.O.';

/**
 * On the legacy Mturk website, 'Approved' was called 'Pending Payment'
 * and 'Pending' was called 'Pending Approval'. Some users may have the legacy
 * hit statuses in their databases.
 */
export type HitStatus =
  | WorkerSubmittedHitState
  | 'Pending Payment'
  | 'Pending Approval';

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
  readonly creationTime: number; // Date converted to number
  readonly lastUpdatedTime: number; // Date converted to number
  readonly markedAsRead?: boolean;
  readonly batchSize: number;
  readonly qualified: boolean;
  readonly timeAllottedInSeconds: number;
  readonly qualsRequired: WorkerQualification[];
  readonly canPreview: boolean;
}

export interface LegacyHitDatabaseEntry {
  readonly id: string;
  /**
   * In 'MMDDYYYY' Format
   */
  readonly date: string;
  readonly title: string;
  readonly reward: number;
  readonly bonus: number;
  readonly status: HitStatus;
  readonly requester: {
    readonly id: string;
    readonly name: string;
  };
  readonly groupId?: string;
  readonly feedback?: string;
  readonly assignmentId?: string;
}

export interface WorkerHitDatabaseEntry extends LegacyHitDatabaseEntry {
  readonly assignmentId: string;
}

export type HitDatabaseEntry = LegacyHitDatabaseEntry | WorkerHitDatabaseEntry;

export interface QueueItem {
  readonly title: string;
  readonly requesterName: string;
  readonly hitId: string;
  readonly groupId: string;
  readonly taskId: string;
  readonly reward: number;
  readonly timeLeftInSeconds: number;
}

export interface NotificationSettings {
  readonly hasPermission: boolean;
  readonly enabled: boolean;
  readonly minReward: number;
  readonly durationInSeconds: number;
}

export interface BlockedHit extends SearchResult {
  readonly dateBlocked: Date;
}

export interface Requester {
  readonly id: string;
  readonly name: string;
  readonly turkopticon?: RequesterInfo;
}

export interface BlockedRequester extends Requester {
  readonly dateBlocked: Date;
}

export interface TOpticonRequester {
  readonly name: string;
  readonly attrs: TOpticonAttributes;
  readonly reviews: number;
  readonly tos_flags: number;
}

export interface TOpticonResponse {
  readonly [id: string]: TOpticonRequester;
}

export interface RequesterInfo {
  readonly scores: RequesterAttributes;
  readonly numReviews: number;
  readonly numTosFlags: number;
}

export interface RequesterAttributes {
  readonly comm?: number;
  readonly pay?: number;
  readonly fair?: number;
  readonly fast?: number;
}

export interface TOpticonAttributes {
  readonly comm?: string;
  readonly pay?: string;
  readonly fair?: string;
  readonly fast?: string;
}

export interface TOpticonSettings extends AttributeWeights {
  readonly hideBelowThresholdEnabled: boolean;
  readonly hideNoToEnabled: boolean;
  readonly minimumWeightedTO: number;
}

export interface AttributeWeights {
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

export interface DailyEarnings {
  readonly reward: number;
  readonly bonus: number;
}

export type AcceptHitFailureReason =
  | 'CAPTCHA'
  | 'NO_AVAILABILITY'
  | 'EXCEEDED_RATE_LIMIT'
  | 'UNQUALIFIED'
  | 'UNKNOWN';
