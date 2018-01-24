type ExceptionStatus = 'neutral' | 'warning' | 'critical';
export interface ExceptionDescriptor {
  status?: ExceptionStatus;
  title?: string;
  description?: string;
}

export const qualException = (qualified: boolean): ExceptionDescriptor | null =>
  !qualified ? { status: 'warning', title: 'Not qualified.' } : null;

export const knownRequesterException = (
  requesterInDatabase: boolean
): ExceptionDescriptor | null =>
  requesterInDatabase ? { title: 'Requester in database.' } : null;

export const generateSearchCardExceptions = (
  qualified: boolean,
  requesterInDatabase: boolean
): ExceptionDescriptor[] =>
  [
    qualException(qualified),
    knownRequesterException(requesterInDatabase)
  ].filter(maybeException => maybeException !== null) as ExceptionDescriptor[];
