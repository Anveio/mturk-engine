import { WorkerApiQualification } from 'worker-mturk-api';
import { WorkerQualification } from 'types';

export const calculateIfQualified = (
  qualificationsArray: WorkerApiQualification[]
) => qualificationsArray.every(qual => !!qual.caller_meets_requirement);

export const transformProjectRequirements = (
  quals: WorkerApiQualification[]
): WorkerQualification[] =>
  quals.map((qual): WorkerQualification => ({
    qualificationId: qual.qualification_type_id,
    name: qual.qualification_type.name,
    description: qual.qualification_type.description,
    comparator: qual.comparator,
    hasTest: qual.qualification_type.has_test,
    requestable: qual.qualification_type.is_requestable,
    userValue: resolveUserQualificationValue(qual),
    userMeetsQualification: !!qual.caller_meets_requirement,
    qualificationValues: qual.qualification_values
  }));

/**
 * Most of the time the value of a qualification is stored in `integer_value`.
 * In which case we just return `integer_value. But if integer_value is null,
 * that means the qualification involves a country and a subdivision or it's
 * not assigned at all.
 * @param qual
 */
const resolveUserQualificationValue = (
  qual: WorkerApiQualification
): string | number => {
  const {
    integer_value,
    locale_value: { country, subdivision }
  } = qual.caller_qualification_value;

  if (integer_value !== null && Number.isFinite(integer_value)) {
    return integer_value;
  } else if (!!country && !!subdivision) {
    return `${country} - ${subdivision}`;
  } else if (!!country) {
    return country;
  } else {
    return 'Not assigned.';
  }
};
