import { determineInputType } from '../utils/watchers';
import { validateProjectIdLink } from '../utils/validation';

const workerLink =
  'https://worker.mturk.com/projects/3MQJWSYXOHGDXJ3GAF96UH2MB215O3/tasks/accept_random?ref=w_pl_prvw';

const projectId = '3MQJWSYXOHGDXJ3GAF96UH2MB215O3';

const legacyLink =
  'https://www.mturk.com/mturk/previewandaccept?groupId=3CRC4NO2BIQQWQ3GX0HLFPTFOD30SA';

describe('Utility functions for adding a watcher', () => {
  test('determineInputType correctly determines input type', () => {
    expect(determineInputType(workerLink)).toEqual('WORKER');
    expect(determineInputType(projectId)).toEqual('GROUP_ID');
    expect(determineInputType(legacyLink)).toEqual('LEGACY');
    expect(determineInputType('')).toEqual('INVALID');
  });

  test('validateProjectIdLink returns true for valid project ID links', () => {
    expect(validateProjectIdLink(workerLink)).toEqual(true);
    expect(validateProjectIdLink(projectId)).toEqual(false);
    expect(validateProjectIdLink(legacyLink)).toEqual(false);
    expect(validateProjectIdLink('')).toEqual(false);
  });
});
