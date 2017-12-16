import { QueueItem } from '../types';

const parseWorkerHit = (html: Document): QueueItem | null => {

};

const hitDetailsPageToQueueItem = (html: Document): QueueItem | null => {
  const hitDetailsReactProps = getHitDetailsReactProps(html);

  if (!hitDetailsReactProps) {
    return null;
  }

  try {
    const 
  } catch (e) {
    throw new Error('Error parsing react data props string.')
  }
}

const getHitDetailsReactProps = (html: Document): string | null => {
  const hitDetailsDataNode = html.querySelector('div.col-sm-4.col-xs-5 > div');

  if (!hitDetailsDataNode) {
    return null;
  } else {
    return hitDetailsDataNode.getAttribute('data-react-props');
  }
};
