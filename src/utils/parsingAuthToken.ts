export const parseHitAuthToken = (html: Document): string => {
  const authTokenInput = html.querySelector('input[name="authenticity_token"]');
  if (authTokenInput && authTokenInput.getAttribute('value') !== null) {
    return authTokenInput.getAttribute('value') as string;
  } else {
    throw new Error('No auth token found for this hit.');
  }
};
