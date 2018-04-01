import { determineInputType } from '../../utils/watchers';
import { validateProjectIdLink } from '../../utils/validation';
import { projectIdLink, projectId, legacyLink } from './fixtures';

describe('Utility functions for adding a watcher', () => {
  test('determineInputType correctly determines input type', () => {
    expect(determineInputType(projectIdLink)).toEqual('WORKER');
    expect(determineInputType(projectId)).toEqual('GROUP_ID');
    expect(determineInputType(legacyLink)).toEqual('LEGACY');
    expect(determineInputType('')).toEqual('INVALID');
  });

  test('validateProjectIdLink returns true for valid input', () => {
    expect(validateProjectIdLink(projectIdLink)).toEqual(true);
  });

  test('validateProjectIdLink returns false for invalid input', () => {
    expect(validateProjectIdLink(projectId)).toEqual(false);
    expect(validateProjectIdLink(legacyLink)).toEqual(false);
    expect(validateProjectIdLink('')).toEqual(false);
  });
});
