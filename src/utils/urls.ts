export const generateAcceptUrl = (groupId: string) =>
  `https://worker.mturk.com/projects/${groupId}/accept_random`;

export const generatePreviewUrl = (groupId: string) =>
  `https://worker.mturk.com/projects/${groupId}/tasks`;
