export interface SearchResultPageData {
  readonly baseUrl: string;
  readonly bodyData: WorkerHit[];
}

export interface WorkerHit {
  readonly accept_project_task_url: string;
  readonly assignable_hits_count: number;
  readonly assignment_duration_in_seconds: number;
  readonly caller_meets_preview_requirements: boolean;
  readonly creation_time: string; // Usable as argument for Date object constructor.
  readonly description: string;
  readonly hit_requirements: Array<WorkerQualification>;
  readonly hit_set_id: string;
  readonly last_updated_time: string;
  readonly latest_expiration_time: string;
  readonly monetary_reward: MonetaryReward;
  readonly project_tasks_url: string;
  readonly requester_id: string;
  readonly requester_name: string;
  readonly requester_url: string;
  readonly title: string;
}

export interface MonetaryReward {
  readonly amount_in_dollars: number;
  readonly currency_code: string;
}

export interface WorkerQualification {
  readonly caller_meets_requirement: boolean;
  readonly comparator: string;
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
