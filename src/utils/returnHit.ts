export type HitReturnStatus = 'repeat' | 'success' | 'error';

export const validateHitReturn = (html: Document): HitReturnStatus => {
  const noAssignedHitsContainer = html.querySelector('td.error_title');

  if (!!noAssignedHitsContainer) {
    return 'success';
  }

  const alertBox = html.querySelector('#alertboxHeader');
  return !!alertBox ? validateAlertBoxText(alertBox) : 'error';
};

export const validateAlertBoxText = (
  el: Element | undefined
): HitReturnStatus => {
  if (el === undefined) {
    return 'error';
  }

  const text = (el as HTMLSpanElement).innerText.trim();
  switch (text) {
    case 'The HIT has been returned.':
      return 'success';
    case 'You have already returned this HIT.':
      return 'repeat';
    default:
      return 'error';
  }
};
