import { StatusFilterType } from 'types';
import { Map, Set } from 'immutable';
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

export const appliedFiltersToStatusFilterTypeSet = (
  filters: AppliedHitDatabaseFilter[]
) =>
  filters.reduce(
    (acc, cur): Set<StatusFilterType> => acc.add(cur.value),
    Set<StatusFilterType>([])
  );

/**
 * Generates the
 * @param filters
 */
export const statusFiltersToAppliedFilterArray = (
  filters: Set<StatusFilterType>
): AppliedFilter[] =>
  filters.toArray().map((filter: StatusFilterType): AppliedFilter => ({
    key: 'STATUS',
    value: filter,
    label: `Status: ${statusFilterTypeToLabel.get(filter)}`
  }));
