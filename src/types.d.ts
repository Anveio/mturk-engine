import { Map, Set } from 'immutable';
import {
  WorkerSubmittedHitState,
  QualificationComparator
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
  readonly uploadedState: Partial<PersistedState> | null;
  readonly expandedSearchResults: ExpandedSearchResultsSet;
  readonly notificationSettings: NotificationSettings;
  readonly loggedSearchResults: SearchResults;
  readonly watcherTreeSettings: WatcherTreeSettings;
  readonly watcherFolders: WatcherFolderMap;
  readonly expandedWatcherFolderIds: Set<string>;
  readonly watcherStatistics: WatcherStatisticsMap;
}

export type SearchResults = Map<string, SearchResult>; // indexed by groupId
export type QueueMap = Map<string, QueueItem>; // indexed by hitId
export type RequesterMap = Map<string, Requester>; // indexed by requesterId
export type HitBlockMap = Map<string, BlockedHit>; // indexed by groupId
export type RequesterBlockMap = Map<string, BlockedRequester>; // indexed by requesterId
export type WatcherMap = Map<string, Watcher>; // indexed by groupId
export type WatcherTimerMap = Map<string, WatcherTimer>; // indexed by groupId
export type WatcherFolderMap = Map<string, WatcherFolder>; // indexed by folderId
export type HitDatabaseMap = Map<string, HitDatabaseEntry>; // indexed by LEGACY_DATE_FORMAT string
export type ExpandedSearchResultsSet = Set<string>; // indexed by groupId
export type WatcherStatisticsMap = Map<string, WatcherStatistics>; // indexed by groupId

export type Primitive = string | number | boolean;

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
  | 'watcherFolders'
  | 'watcherTreeSettings'
  | 'audioSettingsV1'
  | 'dailyEarningsGoal'
  | 'notificationSettings';

export type ImmutablePersistedStateKey =
  | 'hitDatabase'
  | 'hitBlocklist'
  | 'watchers'
  | 'watcherFolders'
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
  | 'useLegacyLinks'
  | 'notificationSettings';

export type SearchSort = 'Latest' | 'Batch Size' | 'Reward';
export interface SearchOptions {
  readonly searchTerm: string;
  readonly delay: number;
  readonly minReward: number;
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
  readonly timeAllottedInSeconds: number;
  readonly qualsRequired: WorkerQualification[];
  readonly batchSize: number;
}

export interface SearchResult extends HumanIntelligenceTask {
  readonly creationTime: number; // Date converted to number
  readonly lastUpdatedTime: number; // Date converted to number
  readonly markedAsRead?: boolean;
  readonly qualified: boolean;
  readonly canPreview: boolean;
}

export interface LoggedSearchResult {
  readonly groupId: string;
  readonly markedAsRead: boolean;
  readonly notificationSent: boolean;
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

export interface QueueItem extends HumanIntelligenceTask {
  readonly description: string;
  readonly hitId: string;
  readonly taskId: string;
  readonly timeLeftInSeconds: number;
}

export interface NotificationSettings {
  readonly hasPermission: boolean;
  readonly enabled: boolean;
  readonly minReward: number;
  readonly durationInSeconds: number;
}

export interface BlockedHit {
  readonly groupId: string;
  readonly title: string;
  readonly requester: Requester;
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
  readonly folderId: string;
  readonly stopAfterFirstSuccess: boolean;
  readonly playSoundAfterSuccess: boolean;
}

export interface WatcherTimer {
  readonly date: Date;
  readonly origin: number;
}

export interface WatcherStatistics {
  readonly successes: number;
  readonly failures: number;
}

export interface AudioSettings {
  readonly enabled: boolean;
  readonly volume: number;
}

export interface WorkerQualification {
  readonly qualificationId: string;
  readonly name: string;
  readonly description: string;
  readonly hasTest: boolean;
  readonly requestable: boolean;
  readonly comparator: QualificationComparator;
  readonly userValue: string | number | null;
  readonly userMeetsQualification: boolean;
  readonly qualificationValues: (string | number)[];
}

export interface AudioFiles {
  readonly audioNewSearch: HTMLAudioElement;
  readonly audioWatcherSuccess: HTMLAudioElement;
}

export interface HeatMapValue {
  readonly date: string;
  readonly count: number;
}

export interface DailyEarnings {
  readonly reward: number;
  readonly bonus: number;
}

export interface WatcherTreeSettings {
  readonly selectionKind: SelectionKind;
  readonly selectionId: string | null;
}

export type WatcherKind = 'groupId' | 'searchTerm' | 'requesterId';

export type SelectionKind = WatcherKind | 'folder' | 'none';

export interface WatcherFolder {
  readonly id: string;
  readonly name: string;
  readonly dateNumCreation: number;
}

export type AcceptHitFailureReason =
  | 'CAPTCHA'
  | 'NO_AVAILABILITY'
  | 'EXCEEDED_RATE_LIMIT'
  | 'UNQUALIFIED'
  | 'UNKNOWN';
