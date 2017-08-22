import * as Immutable from 'immutable';
import { ToastrState } from 'react-redux-toastr';

export interface RootState {
  readonly tab: number;
  readonly queue: SearchMap;
  readonly toastr: ToastrState;
  readonly search: SearchMap;
  readonly requesters: RequesterMap;
  readonly searchOptions: SearchOptions;
  readonly searchFormActive: boolean;
  
}

export type SearchMap = Immutable.Map<string, SearchItem>;
export type QueueMap = Immutable.Map<string, QueueItem>;
export type RequesterMap = Immutable.Map<string, Requester>;

export type SearchSort = 'Latest' | 'Batch Size' | 'Reward';
export interface SearchOptions {
  readonly delay: string;
  readonly minReward: string;
  readonly sortType: SearchSort;
  readonly qualified: boolean;
}

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
}

export interface QueueItem {
  readonly title: string;
  readonly requesterName: string;
  readonly hitId: string;
  readonly reward: string;
}

export interface TOpticonResponse {
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

/**
 * Each string should be parseFloat()-able into a number.
 */
export interface Requester extends TOpticonResponse {
  readonly id?: string;
}
