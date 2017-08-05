import axios from 'axios';

export const fetchRequesterTO = async (requesterIds: string[]) => {
  const x = await axios.get(`https://turkopticon.ucsd.edu/api/multi-attrs.php?ids=`);
  return x;
};
