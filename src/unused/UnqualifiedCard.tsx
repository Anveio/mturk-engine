// import * as React from 'react';
// import {
//   Card,
//   Stack,
//   DisplayText,
//   Button,
//   ButtonGroup,
//   Badge
// } from '@shopify/polaris';
// import RequesterButton from './RequesterButton';
// import { Hit } from '../../types';
// import { truncate } from '../../utils/formatting';

// const UnqualifiedCard = (hit: Hit) => {
//   const { reward, requesterName, title, requesterId, turkopticon } = hit;
//   return (
//     <Card subdued>
//       <Stack>
//         <Card.Section>
//           <Stack>
//             <ButtonGroup segmented>
//               <Button icon="view" disabled />
//               <Button icon="add" disabled />
//             </ButtonGroup>
//             <DisplayText>{reward}</DisplayText>
//           </Stack>
//         </Card.Section>
//         <Card.Section title={truncate(title)}>
//           <Stack>
//             <RequesterButton
//               requester={turkopticon || requesterName}
//               id={requesterId}
//             />
//             <Badge progress="incomplete" status="info">
//               Unqualified
//             </Badge>
//           </Stack>
//         </Card.Section>
//       </Stack>
//     </Card>
//   );
// };

// export default UnqualifiedCard;
