export const generateAcceptUrl = (groupId: string) =>
  `https://worker.mturk.com/projects/${groupId}/tasks/accept_random`;

export const generatePreviewUrl = (groupId: string) =>
  `https://worker.mturk.com/projects/${groupId}/tasks`;
