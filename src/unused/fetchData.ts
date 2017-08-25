// import { Dispatch } from 'react-redux';
// import { SearchItem, Requester, SearchOptions } from '../types';
// import { Map } from 'immutable';
// import {
//   SearchAction,
//   searchSuccess,
//   searchFailure
// } from '../actions/search';
// import {
//   TOpticonAction,
//   fetchTOpticonSuccess,
//   fetchTOpticonFailure
// } from '../actions/turkopticon';
// import { batchFetchTOpticon, requesterIdsWithNoTO } from '../utils/turkopticon';
// import { batchFetchHits } from '../utils/fetchHits';
// import { generateSearchToast } from '../utils/toastr';

// export type FetchAction = SearchAction | TOpticonAction;

// export const queryMturkAndTOpticon = (
//   dispatch: Dispatch<FetchAction>
// ) => async (options: SearchOptions) => {
//   /**
//    * Credit to: https://www.bignerdranch.com/blog/cross-stitching-elegant-concurrency-patterns-for-javascript/
//    */
//   const fetchHits = (async () => {
//     try {
//       const hitData = await batchFetchHits(options);
//       const empty = hitData.isEmpty();
//       generateSearchToast(!empty);
//       empty
//         ? dispatch(searchFailure())
//         : dispatch(searchSuccess(hitData));
//       return hitData;
//     } catch (e) {
//       /**
//        * Return an empty set on error to simplify function signature.
//        */
//       generateSearchToast(false);
//       dispatch(searchFailure());
//       return Map<string, SearchItem>();
//     }
//   })();

//   const fetchTopticonData = (async () => {
//     try {
//       /**
//        * We cannot know what to query Turkopticon with until fetchHits resolves.
//        * After fetchHits resolves we query Turkopticon with the ids of each
//        * requester returned by fetchHits.
//        */
//       const hits = await fetchHits;
//       if (hits.isEmpty()) {
//         /**
//          * Immediately exit without sending network request
//          * and return an empty map to simply function signature.
//          */
//         return Map<string, Requester>();
//       }
//       /**
//        * Because the incoming search results are fresh and have no TO applied,
//        * the requesterIdsWithNoTO will always be equal to the searchResults..
//        */
//       const requesterIds = requesterIdsWithNoTO(hits);
//       return await batchFetchTOpticon(requesterIds);
//     } catch (e) {
//       dispatch(fetchTOpticonFailure());
//       return Map<string, Requester>();
//     }
//   })();

//   const topticonData = await fetchTopticonData;
//   topticonData && !topticonData.isEmpty()
//     ? dispatch(fetchTOpticonSuccess(topticonData))
//     : dispatch(fetchTOpticonFailure());
// };
