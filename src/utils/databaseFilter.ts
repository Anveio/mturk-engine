import {
  StatusFilterType,
  HitDatabaseMap,
  HitDatabaseEntry,
  HitStatus
} from 'types';
import { Map } from 'immutable';
import { AppliedFilter, FilterType } from '@shopify/polaris';

const statusFilterTypeToLabel: Map<StatusFilterType, string> = Map([
  ['PENDING', 'Pending'],
  ['PAID', 'Paid'],
  ['APPROVED', 'Approved'],
  ['REJECTED', 'Rejected']
]);

export interface HitDatabaseFilter {
  readonly key: 'STATUS';
  readonly label: string;
  readonly type: FilterType.Select;
  readonly options: HitDatabaseFilterOption[];
}

export interface HitDatabaseFilterOption {
  readonly value: StatusFilterType;
  readonly label: string;
}

export interface AppliedHitDatabaseFilter {
  readonly key: 'STATUS';
  readonly value: StatusFilterType;
  readonly label?: string;
}

export const availableFilters: HitDatabaseFilter[] = [
  {
    key: 'STATUS',
    label: 'Status',
    type: FilterType.Select,
    options: statusFilterTypeToLabel.reduce(
      (acc: HitDatabaseFilterOption[], cur: string, key: StatusFilterType) =>
        acc.concat([
          {
            label: cur,
            value: key
          }
        ]),
      []
    )
  }
];

export const appliedFiltersToStatusFilterTypeArray = (
  filters: AppliedHitDatabaseFilter[]
) =>
  filters.reduce((acc: StatusFilterType[], cur) => acc.concat(cur.value), []);

/**
 * Generates the
 * @param filters
 */
export const statusFiltersToAppliedFilterArray = (
  filters: StatusFilterType[]
): AppliedFilter[] =>
  filters.map((filter: StatusFilterType): AppliedFilter => ({
    key: 'STATUS',
    value: filter,
    label: `Status: ${statusFilterTypeToLabel.get(filter)}`
  }));

const hitStatusToStatusFilterType = (
  hitStatus: HitStatus
): StatusFilterType => {
  switch (hitStatus) {
    case 'Paid':
      return 'PAID';
    case 'Approved':
    case 'Pending Payment':
      return 'APPROVED';
    case 'Rejected':
      return 'REJECTED';
    case 'Submitted':
    case 'Pending Approval':
      return 'PENDING';
    default:
      throw new Error('Invalid HIT status');
  }
};

export const filterBy = (database: HitDatabaseMap) => (
  statusFilter: StatusFilterType
): HitDatabaseMap =>
  database.filter(
    (hit: HitDatabaseEntry) =>
      hitStatusToStatusFilterType(hit.status) === statusFilter
  ) as HitDatabaseMap;

export const createFilterFn = (searchTerm: string, searchRegex: RegExp) => (
  hit: HitDatabaseEntry
) =>
  hit.id === searchTerm ||
  (hit.assignmentId && hit.assignmentId === searchTerm) ||
  hit.requester.id === searchTerm ||
  searchRegex.test(hit.title) ||
  searchRegex.test(hit.requester.name);
