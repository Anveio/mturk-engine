type ExceptionStatus = 'neutral' | 'warning' | 'critical';
export interface ExceptionDescriptor {
  status?: ExceptionStatus;
  title?: string;
  description?: string;
}

export const qualException = (qualified: boolean): ExceptionDescriptor[] => {
  return !qualified ? [ { status: 'warning', title: 'Not qualified.' } ] : [];
};
