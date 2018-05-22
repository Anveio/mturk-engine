import {
  StatusFilterType,
  HitDatabaseMap,
  HitDatabaseEntry,
  HitStatus,
  FilterOrderType
} from 'types';
import { Map } from 'immutable';
import { AppliedFilter, FilterType } from '@shopify/polaris';
import { legacyDateFormatToDateObj } from './dates';

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

interface FilterSortOrderOption {
  readonly value: FilterOrderType;
  readonly label: string;
  readonly disabled?: boolean;
}

export const databaseFilterSortOptions: FilterSortOrderOption[] = [
  {
    label: 'Highest Pay',
    value: 'PAY_DESC'
  },
  {
    label: 'Newest submitted',
    value: 'DATE_RECENT_FIRST'
  },
  {
    label: 'Oldest submitted',
    value: 'DATE_OLDEST_FIRST'
  }
];

export type FilterOrderToSortFnMap = { [K in FilterOrderType]: DatabaseSortFn };

const sortOrderToSortFnMap: FilterOrderToSortFnMap = {
  PAY_DESC: (a, b) => b.reward + b.bonus - (a.reward + a.bonus),
  DATE_RECENT_FIRST: (a, b) =>
    legacyDateFormatToDateObj(b.date).valueOf() -
    legacyDateFormatToDateObj(a.date).valueOf(),
  DATE_OLDEST_FIRST: (a, b) =>
    legacyDateFormatToDateObj(a.date).valueOf() -
    legacyDateFormatToDateObj(b.date).valueOf()
};

interface DatabaseSortFn {
  (a: HitDatabaseEntry, b: HitDatabaseEntry): number;
}

export const createSortFn = (sortOrder: FilterOrderType): DatabaseSortFn =>
  sortOrderToSortFnMap[sortOrder];
