function getQuery<T>(query: string[] | string | undefined, defaultValue: T) {
  return Array.isArray(query) ? query[0] : query ?? defaultValue;
}

export { getQuery };
