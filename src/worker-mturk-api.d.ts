import { HitStatus } from './types';

/**
 * The object produced when calling JSON.parse on the react-props of a search results page.
 */
export interface SearchResultsApiResponse {
  readonly baseUrl: string;
  readonly bodyData: WorkerSearchResult[];
}

/**
 * The object produced when calling JSON.parse on the react-props of a user's queue.
 */
export interface QueueApiResponse {
  readonly bodyData: WorkerQueueItem[];
  readonly tableConfig: WorkerTableConfig[];
}

export interface DashboardApiResponse {
  readonly availableEarnings: MonetaryReward;
  readonly balance_by_end_of_last_year: number;
  readonly balance_by_end_of_year_before_last: number;
  readonly current_balance: number;
  readonly daily_hit_statistics_overview: DailyHitStatistics[];
  readonly earnings_to_date: {
    readonly approved: number;
    readonly bonuses: number;
    readonly total_earnigns: number;
  };
  readonly hits_overview: {
    readonly approved: number;
    readonly approvalRate: number;
    readonly pending: number;
    readonly rejected: number;
    readonly rejection_rate: number;
  };
  readonly reward_payment_balances: {
    readonly current_reward_payment_balance: MonetaryReward;
    readonly reward_payment_balance_by_end_of_last_year: MonetaryReward;
    readonly reward_payment_balance_by_end_of_year_before_last: MonetaryReward;
  };
}

export interface StatusDetailApiResponse {
  results: {};
}

/**
 * The object produced when calling JSON.parse on the react-props of an accepted HIT's details modal.
 */
export interface AcceptedHitDetailsModal {
  readonly children: string;
  readonly modalHeader: string;
  readonly modalOptions: HitModalDetails;
}

export interface StatusDetailApiResponse {
  readonly bodyData: WorkerSubmittedHit[];
  readonly tableConfig: WorkerTableConfig;
}

/**
 * The object produced when calling JSON.parse on the react-props of an accepted HIT's time remaining.
 */
export interface WorkerAcceptedHitTimeRemaining {
  readonly className: string;
  readonly originalTimeToCompleteInSeconds: number;
  readonly timeRemainingInSeconds: number;
  readonly update: boolean;
}

export interface ErrorBannerProps {
  readonly header: string;
  readonly message: string;
  readonly renderMessageAsHTML: boolean;
  readonly type: string;
}

export interface WorkerHit {
  readonly assignable_hits_count: number;
  readonly assignment_duration_in_seconds: number;
  readonly caller_meets_preview_requirements: boolean;
  readonly creation_time: string; // Date object converted to JSON string.
  readonly description: string;
  readonly hit_set_id: string;
  readonly last_updated_time: string;
  readonly latest_expiration_time: string;
  readonly monetary_reward: MonetaryReward;
  readonly requester_id: string;
  readonly requester_name: string;
  readonly requester_url: string;
  readonly title: string;
}

/**
 * hit_requirements is renamed to project_requirements in search results as of now.
 */
export interface WorkerHitNew extends WorkerHit {
  readonly project_requirements: WorkerQualification[];
}

export interface WorkerHitOld extends WorkerHit {
  readonly hit_requirements: WorkerQualification[];
}

export interface WorkerSearchResult extends WorkerHitNew {
  readonly accept_project_task_url: string;
  readonly project_tasks_url: string;
}

export interface WorkerQueueItem {
  readonly accepted_at: string; // Date object converted to JSON string.
  readonly assignment_id: string;
  readonly deadline: string; // Date object converted to JSON string.
  readonly expired_task_action_url: string;
  readonly project: WorkerHitOld;
  readonly question: QueueItemQuestion;
  readonly state: 'Assigned'; // Possibly others?;
  readonly time_to_deadline_in_seconds: number;
  readonly task_id: string;
  readonly task_url: string;
}

export interface WorkerSubmittedHit {
  readonly assignment_id: string;
  readonly hit_id: string;
  readonly requester_feedback: string;
  readonly requester_id: string;
  readonly requester_name: string;
  readonly reward: MonetaryReward;
  readonly state: WorkerSubmittedHitState;
  readonly title: string;
}

export interface MonetaryReward {
  readonly amount_in_dollars: number;
  readonly currency_code: string;
}

export interface WorkerQualification {
  readonly caller_meets_requirement: boolean;
  readonly comparator: QualificationComparator;
  readonly qualification_type: QualificationType;
  readonly qualification_type_id: string;
  readonly qualification_values: string[];
  readonly worker_action: string;
}

export interface QualificationType {
  readonly description: string;
  readonly has_test: boolean;
  readonly is_requestable: boolean;
  readonly keywords: string;
  readonly name: string;
  readonly qualification_type_id: string;
  readonly visibility: boolean;
}

export type QualificationComparator =
  | 'DoesNotExist'
  | 'EqualTo'
  | 'NotEqualTo'
  | 'GreaterThan'
  | 'GreaterThanOrEqualTo'
  | 'LessThan'
  | 'LessThanOrEqualTo'
  | 'In';

export interface WorkerSearchParams {
  readonly page_size: number;
  readonly page_number: number;
  readonly filters: Partial<WorkerSearchFilters>;
  readonly sort: WorkerSortParam;
}

export interface WorkerSearchFilters {
  readonly qualified: boolean;
  readonly min_reward: number;
  readonly masters: boolean;
  readonly search_term: string;
}

export type WorkerSortParam =
  | 'updated_asc'
  | 'updated_desc'
  | 'reward_asc'
  | 'reward_desc'
  | 'num_hits_asc'
  | 'num_hits_desc';

export interface WorkerTableConfig {
  readonly classNames: string[];
  readonly header: {
    readonly title: string;
  };
}

export interface QueueItemQuestion {
  readonly attributes: {
    readonly FrameHeight: string; // String representation of a number;
    readonly FrameSourceAttribute: string; // a URL;
  };
  readonly type: string;
  readonly value: string; // a URL;
}

export interface HitModalDetails {
  readonly assignableHitsCount: number;
  readonly assignmentDurationInSeconds: 7200;
  readonly contactRequesterUrl: string; // a URL;
  readonly creationTime: string; // Date object converted to JSON string.
  readonly description: string;
  readonly expirationTime: string; // Date object converted to JSON string.
  readonly monetaryReward: {
    readonly amountInDollars: number;
    readonly currendyCode: string;
  };
  readonly projectTitle: string;
  readonly requesterName: string;
}

export type WorkerSubmittedHitState =
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Paid';

export interface DailyHitStatistics {
  readonly date: string; // Date object converted to JSON string;
  readonly submitted: number;
  readonly approved: number;
  readonly rejected: number;
  readonly pending: number;
  readonly earnings: number;
}
