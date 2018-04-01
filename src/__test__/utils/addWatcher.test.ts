import { determineInputType } from '../../utils/watchers';
import { validateProjectIdLink } from '../../utils/validation';
import { projectAcceptRandomLink, projectId, legacyLink } from './fixtures';

describe('Utility functions for adding a watcher', () => {
  test('determineInputType correctly determines input type', () => {
    expect(determineInputType(projectAcceptRandomLink)).toEqual('WORKER');
    expect(determineInputType(projectId)).toEqual('GROUP_ID');
    expect(determineInputType(legacyLink)).toEqual('LEGACY');
    expect(determineInputType('')).toEqual('INVALID');
  });

  test('validateProjectIdLink returns true for valid project ID links', () => {
    expect(validateProjectIdLink(projectAcceptRandomLink)).toEqual(true);
    expect(validateProjectIdLink(projectId)).toEqual(false);
    expect(validateProjectIdLink(legacyLink)).toEqual(false);
    expect(validateProjectIdLink('')).toEqual(false);
  });
});
