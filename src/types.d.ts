import { Map } from 'immutable';
import {
  WorkerQualification,
  WorkerSubmittedHit,
  WorkerSubmittedHitState
} from './worker-mturk-api';

interface RootState {
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
  readonly legacyLinksEnabled: boolean;
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
}

type SearchResults = Map<string, SearchResult>;
type QueueMap = Map<string, QueueItem>;
type RequesterMap = Map<string, Requester>;
type HitBlockMap = Map<string, BlockedHit>;
type RequesterBlockMap = Map<string, BlockedRequester>;
type WatcherMap = Map<string, Watcher>;
type WatcherTimerMap = Map<string, Date>;
type HitDatabaseMap = Map<string, HitDatabaseEntry>;
type ExpandedSearchResultsMap = Map<string, true>; // indexed by groupId

/**
 * The keys of RootState that are persisted by redux-persist.
 * See `PERSISTED_STATE_WHITELIST` in ./constants/settings
 */
type PersistedStateKey =
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
  | 'legacyLinksEnabled';

type ImmutablePersistedStateKey =
  | 'hitDatabase'
  | 'hitBlocklist'
  | 'watchers'
  | 'requesterBlocklist';

type ImmutablePersistedDataType =
  | HitBlockMap
  | RequesterBlockMap
  | WatcherMap
  | HitDatabaseMap;

type PersistedState = Pick<RootState, PersistedStateKey>;
type ImmutablePersistedState = Pick<RootState, ImmutablePersistedStateKey>;

type MaybeAccount = AccountInfo | null;

type FormTarget = 'searchOptions' | 'topticonSettings' | 'useLegacyLinks';

type SearchSort = 'Latest' | 'Batch Size' | 'Reward';
interface SearchOptions {
  readonly searchTerm: string;
  readonly delay: string;
  readonly minReward: string;
  readonly sortType: SearchSort;
  readonly qualifiedOnly: boolean;
}

type SortingOption = 'Batch Size' | 'Reward' | 'Latest' | 'Weighted T.O.';

/**
 * On the legacy Mturk website, 'Approved' was called 'Pending Payment'
 * and 'Pending' was called 'Pending Approval'. Some users may have the legacy
 * hit statuses in their databases.
 */
type HitStatus =
  | WorkerSubmittedHitState
  | 'Pending Payment'
  | 'Pending Approval';

interface AccountInfo {
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

interface HumanIntelligenceTask {
  readonly title: string;
  readonly requester: Requester;
  readonly reward: number;
  readonly groupId: string;
  readonly description: string;
}

interface SearchResult extends HumanIntelligenceTask {
  readonly creationTime: number; // Date converted to number
  readonly lastUpdatedTime: number; // Date converted to number
  readonly markedAsRead?: boolean;
  readonly batchSize: number;
  readonly qualified: boolean;
  readonly timeAllottedInSeconds: number;
  readonly qualsRequired: WorkerQualification[];
  readonly canPreview: boolean;
}

interface HitDatabaseEntry {
  readonly id: string;
  readonly date: string; // In MMDDYYYY Format
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
}

interface QueueItem {
  readonly title: string;
  readonly requesterName: string;
  readonly hitId: string;
  readonly groupId: string;
  readonly taskId: string;
  readonly reward: number;
  readonly timeLeftInSeconds: number;
}

interface BlockedHit extends SearchResult {
  readonly dateBlocked: Date;
}

interface Requester {
  readonly id: string;
  readonly name: string;
  readonly turkopticon?: RequesterInfo;
}

interface BlockedRequester extends Requester {
  readonly dateBlocked: Date;
}

interface TOpticonRequester {
  readonly name: string;
  readonly attrs: TOpticonAttributes;
  readonly reviews: number;
  readonly tos_flags: number;
}

interface TOpticonResponse {
  readonly [id: string]: TOpticonRequester;
}

interface RequesterInfo {
  readonly scores: RequesterAttributes;
  readonly unweightedAverageScore: number | null;
  readonly weightedAverageScore: number | null;
  readonly numReviews: number;
  readonly numTosFlags: number;
}

interface RequesterAttributes {
  readonly comm?: number;
  readonly pay?: number;
  readonly fair?: number;
  readonly fast?: number;
}

interface TOpticonAttributes {
  readonly comm?: string;
  readonly pay?: string;
  readonly fair?: string;
  readonly fast?: string;
}

interface TOpticonSettings extends AttributeWeights {
  readonly hideBelowThresholdEnabled: boolean;
  readonly hideNoToEnabled: boolean;
  readonly minimumWeightedTO: number;
}

interface AttributeWeights {
  readonly payWeight: number;
  readonly fairWeight: number;
  readonly commWeight: number;
  readonly fastWeight: number;
}

interface Watcher {
  readonly groupId: string;
  readonly title: string;
  readonly delay: number;
  readonly description: string;
  readonly createdOn: Date;
  readonly timeNextAttempt: Date | null;
  readonly hit?: HumanIntelligenceTask;
}

interface AudioSettings {
  readonly enabled: boolean;
  readonly volume: number;
}

interface AudioFiles {
  readonly audioNewSearch: HTMLAudioElement;
}

interface HeatMapValue {
  readonly date: string;
  readonly count: number;
}

interface DailyEarnings {
  readonly reward: number;
  readonly bonus: number;
}

type AcceptHitFailureReason =
  | 'CAPTCHA'
  | 'NO_AVAILABILITY'
  | 'EXCEEDED_RATE_LIMIT'
  | 'UNQUALIFIED'
  | 'UNKNOWN';

interface QueuePageData {
  readonly queueAuthToken: string | null;
  readonly queueItems: QueueMap;
}
