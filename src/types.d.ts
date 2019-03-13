import { Map, Set } from "immutable";
import {
  WorkerSubmittedHitState,
  QualificationComparator
} from "./worker-mturk-api";

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
  readonly selectedHitDbDate: LegacyDateFormat | null;
  readonly requesterBlocklist: RequesterBlockMap;
  readonly audioSettingsV1: AudioSettings;
  readonly watcherTimers: WatcherTimerMap;
  readonly uploadedState: Partial<PersistedState> | null;
  readonly expandedSearchResults: ExpandedSearchResultsSet;
  readonly expandedQueueItems: ExpandedQueueItemsSet;
  readonly notificationSettings: NotificationSettings;
  readonly notifiedSearchResultIds: Set<GroupId>;
  readonly watcherTreeSettings: WatcherTreeSettings;
  readonly searchAudioEnabled: boolean;
  readonly watcherFolders: WatcherFolderMap;
  readonly expandedWatcherFolderIds: Set<GroupId>;
  readonly watcherStatistics: WatcherStatisticsMap;
  readonly queueSortingOption: QueueSortingOption;
  readonly loggedRequesters: RequesterMap;
  readonly databaseFilterSettings: DatabaseFilterSettings;
  readonly markedAsReadGroupIds: Set<GroupId>;
  readonly hitBlocklistFilterSettings: HitBlocklistFilterSettings;
}

export type Primitive = string | number | boolean;

export type GroupId = string;
export type HitId = string;
export type RequesterId = string;
export type FolderId = string;
export type AssignmentId = string;
export type TaskId = string;
/**
 * Format: MMDDYYY
 */
export type LegacyDateFormat = string;
/**
 * Format: YYYY-MM-DD
 */
export type WorkerDateFormat = string;

export type SearchResults = Map<GroupId, SearchResult>;
export type QueueMap = Map<HitId, QueueItem>;
export type RequesterMap = Map<RequesterId, Requester>;
export type HitBlockMap = Map<GroupId, BlockedHit>;
export type RequesterBlockMap = Map<RequesterId, BlockedRequester>;
export type WatcherMap = Map<GroupId, Watcher>;
export type WatcherTimerMap = Map<GroupId, WatcherTimer>;
export type WatcherFolderMap = Map<FolderId, WatcherFolder>;
export type HitDatabaseMap = Map<HitId, HitDatabaseEntry>;
export type ExpandedSearchResultsSet = Set<GroupId>;
export type ExpandedQueueItemsSet = Set<HitId>;
export type WatcherStatisticsMap = Map<GroupId, WatcherStatistics>;

export type BlockList = RequesterBlockMap | HitBlockMap;
export type BlockedEntry = BlockedHit | BlockedRequester;

/**
 * The keys of RootState that are persisted by redux-persist.
 * See `PERSISTED_STATE_WHITELIST` in ./constants/settings
 */
export type PersistedStateKey =
  | "tab"
  | "account"
  | "hitBlocklist"
  | "hitDatabase"
  | "requesterBlocklist"
  | "sortingOption"
  | "searchOptions"
  | "topticonSettings"
  | "watchers"
  | "watcherFolders"
  | "watcherTreeSettings"
  | "audioSettingsV1"
  | "dailyEarningsGoal"
  | "notificationSettings"
  | "searchAudioEnabled";

export type ImmutablePersistedStateKey =
  | "hitDatabase"
  | "hitBlocklist"
  | "watchers"
  | "watcherFolders"
  | "requesterBlocklist";

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
  | "searchOptions"
  | "topticonSettings"
  | "notificationSettings";

export type SearchSort = "Latest" | "Batch Size" | "Reward";
export interface SearchOptions {
  readonly searchTerm: string;
  readonly delay: number;
  readonly minReward: number;
  readonly sortType: SearchSort;
  readonly qualifiedOnly: boolean;
}

export type SortingOption =
  | "Batch Size"
  | "Reward"
  | "Latest"
  | "Weighted T.O.";

/**
 * On the legacy Mturk website, 'Approved' was called 'Pending Payment'
 * and 'Pending' was called 'Pending Approval'. Some users may have the legacy
 * hit statuses in their databases.
 */
export type HitStatus =
  | WorkerSubmittedHitState
  | "Pending Payment"
  | "Pending Approval";

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
  readonly qualified: boolean;
  readonly canPreview: boolean;
}

export interface LoggedSearchResult {
  readonly groupId: GroupId;
  readonly markedAsRead: boolean;
  readonly notificationSent: boolean;
}

export interface LegacyHitDatabaseEntry {
  readonly id: HitId;
  readonly date: LegacyDateFormat;
  readonly title: string;
  readonly reward: number;
  readonly bonus: number;
  readonly status: HitStatus;
  readonly requester: {
    readonly id: RequesterId;
    readonly name: string;
  };
  readonly groupId?: GroupId;
  readonly feedback?: string;
  readonly assignmentId?: AssignmentId;
}

export interface WorkerHitDatabaseEntry extends LegacyHitDatabaseEntry {
  readonly assignmentId: AssignmentId;
}

export type HitDatabaseEntry = LegacyHitDatabaseEntry | WorkerHitDatabaseEntry;

export type StatusFilterType = "PENDING" | "APPROVED" | "PAID" | "REJECTED";

export type FilterOrderType =
  | "PAY_DESC"
  | "DATE_RECENT_FIRST"
  | "DATE_OLDEST_FIRST";

export interface DatabaseFilterSettings {
  readonly searchTerm: string;
  readonly statusFilters: StatusFilterType[];
  readonly sortOrder: FilterOrderType;
}

export interface HitBlocklistFilterSettings {
  readonly shouldRender: boolean;
  readonly searchTerm: string;
  readonly sortOrder: FilterOrderType;
}

export interface QueueItem extends HumanIntelligenceTask {
  /**
   * fresh will be false when QueueItems are not created from an API response.
   */
  readonly fresh: boolean;
  readonly description: string;
  readonly hitId: HitId;
  readonly taskId: TaskId;
  readonly assignmentId: AssignmentId;
  readonly timeLeftInSeconds: number;
}

export interface NotificationSettings {
  readonly hasPermission: boolean;
  readonly enabled: boolean;
  readonly minReward: number;
  readonly durationInSeconds: number;
}

export interface BlockedHit {
  readonly groupId: GroupId;
  readonly title: string;
  readonly requester: Requester;
  readonly dateBlocked: Date;
}

export interface Requester {
  readonly id: RequesterId;
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
  readonly groupId: GroupId;
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
  readonly selectionId: FolderId | GroupId | null;
}

export type WatcherKind = "groupId" | "searchTerm" | "requesterId";

export type SelectionKind = WatcherKind | "folder" | "none";

export interface WatcherFolder {
  readonly id: FolderId;
  readonly name: string;
  readonly dateNumCreation: number;
}

export type QueueSortingOption = "REWARD_DESC" | "TIME_LEFT_ASC";
