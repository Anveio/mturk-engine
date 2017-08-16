// import * as React from 'react'
// import {Tabs} from '@shopify/polaris';
// import { HitMap, RequesterMap, } from '../../types';
// import HitTable from '../HitTable/HitTable';
// import Search from '../../containers/Search';
// import { tabs } from '../../utils/tabs';

// export interface Props {
//   readonly selected: number;
//   readonly hits: HitMap;
//   readonly requesters: RequesterMap;
// }

// export interface Handlers {
//   readonly onSelectTab: (selectedTabIndex: number) => void;
// }

// const TabNavigation = (props: Props & Handlers) => {
//   const { onSelectTab, selected, hits, requesters } = props;
//   return (
//           <Tabs selected={selected} tabs={tabs} onSelect={onSelectTab}>
//             <Search />
//             <HitTable
//               hits={hits}
//               requesters={requesters}
//             />
//           </Tabs>
//   );
// };

// export default App;