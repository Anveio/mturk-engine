export const parseQueueAuthToken = (html: Document): string | null => {
  const authTokenInput = html.querySelector('input[name="authenticity_token"]');
  if (authTokenInput && authTokenInput.getAttribute('value')) {
    return authTokenInput.getAttribute('value');
  } else {
    console.warn('No auth token found on queue page.');
    return null;
  }
};
