type ExceptionStatus = 'neutral' | 'warning' | 'critical';
export interface ExceptionDescriptor {
  status?: ExceptionStatus;
  title?: string;
  description?: string;
}

export const generateExceptions = (groupId: string): ExceptionDescriptor[] => {
  return groupId.startsWith('[Error:groupId]-')
    ? [ { status: 'warning', title: 'You are not qualified.' } ]
    : [];
};
