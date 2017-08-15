// import * as React from 'react';
// import { Requester } from '../../types';
// import { Button, Stack, Badge } from '@shopify/polaris';
// import RequesterBadges from './RequesterBadges';
// import { calculateAverageScore } from '../../utils/turkopticon';
// import { truncate } from '../../utils/formatting';
// import { tutkopticonBaseUrl } from '../../constants';

// interface Props {
//   readonly requester: Requester | string;
//   readonly id: string;
// }

// const RequesterButton = ({ requester, id }: Props) => {
//   const textNoTO = (name: string) => {
//     return (
//       <Stack spacing="tight" vertical={false}>
//         <p>{truncate(name, 45)}</p>
//         <Badge progress="incomplete">No T.O.</Badge>
//       </Stack>
//     );
//   };

//   const buttonTO = (props: Requester) => {
//     const { name, attrs } = props;

//     return (
//       <Stack spacing="tight" vertical={false}>
//         <Button plain url={tutkopticonBaseUrl + id} external>
//           {`${truncate(name, 45)} - ${calculateAverageScore(attrs)}`}
//         </Button>
//         <RequesterBadges {...props} />
//       </Stack>
//     );
//   };

//   return typeof requester === 'string' ? textNoTO(requester) : buttonTO(requester);
// };

// export default RequesterButton;
