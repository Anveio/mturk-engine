import { QueueItem } from '../types';
import {
  AcceptedHitDetailsModal,
  WorkerAcceptedHitTimeRemaining
} from '../worker-mturk-api';
import { parseReactProps } from './parsing';
import {
  hitDetailsModalQuerySelector,
  acceptedHitTimeRemainingQuerySelector,
  returnAssignmentFormQuerySelector
} from '../constants/querySelectors';

export const parseWorkerHit = (html: Document): QueueItem => {
  const queueItem = hitDetailsPageToQueueItem(html);
  if (!queueItem) {
    throw new Error(`Could not create a queue item from the given document`);
  }

  return queueItem;
};

const hitDetailsPageToQueueItem = (html: Document): QueueItem | null => {
  const hitDetailsReactProps = parseReactProps(html)(
    hitDetailsModalQuerySelector
  );

  try {
    const hitDetails: AcceptedHitDetailsModal = JSON.parse(
      hitDetailsReactProps
    );
    const {
      modalOptions: { monetaryReward, projectTitle, requesterName }
    } = hitDetails;

    const { groupId, taskId, hitId } = parseIdStrings(html);
    return {
      title: projectTitle,
      requesterName: requesterName,
      reward: monetaryReward.amountInDollars,
      timeLeftInSeconds: parseTimeLeft(html),
      groupId,
      hitId,
      taskId
    };
  } catch (e) {
    console.warn(e);
    return null;
  }
};

const parseTimeLeft = (html: Document): number => {
  const reactProps = parseReactProps(html)(
    acceptedHitTimeRemainingQuerySelector
  );
  const data: WorkerAcceptedHitTimeRemaining = JSON.parse(reactProps);
  return data.timeRemainingInSeconds;
};

interface IdStrings {
  groupId: string;
  taskId: string;
  hitId: string;
}

const parseIdStrings = (html: Document): IdStrings => {
  const hitIdRegex = /\/?assignment_id=(.*)\&/g;
  const taskIdRegex = /tasks\/(.*)\?assignment_id/g;
  const groupIdRegex = /projects\/(.*)\/tasks/g;
  /**
   * The return assignment form has all the information we neeed to return
   * IdStrings.
   */
  const returnAssignmentForm = html.querySelector(
    returnAssignmentFormQuerySelector
  );
  if (!returnAssignmentForm) {
    throw new Error(`Couldn't find return assignment form.`);
  } else {
    const action = returnAssignmentForm.getAttribute('action') as string;
    return {
      groupId: executeRegex(action)(groupIdRegex),
      hitId: executeRegex(action)(hitIdRegex),
      taskId: executeRegex(action)(taskIdRegex)
    };
  }
};

const executeRegex = (inputString: string) => (regex: RegExp) => {
  const resultArr = regex.exec(inputString);
  if (resultArr === null || resultArr.length < 1) {
    throw new Error(
      `Problem parsing string. Input: ${inputString} :: Regexp: ${regex} :: Result: ${resultArr}`
    );
  } else {
    return resultArr[1];
  }
};
