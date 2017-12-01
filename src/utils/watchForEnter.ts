export const watchForEnter = <T extends HTMLElement>(
  cb: (e: React.KeyboardEvent<T>) => void
) => (e: React.KeyboardEvent<T>) => {
  if (e.charCode === 13) {
    cb(e);
  }
};
