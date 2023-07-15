function debounce<F extends (...args: never[]) => void>(
  func: F,
  waitFor: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), waitFor);
  };
}

export { debounce };
