interface PaginateResult<T> {
  paginatedItems: T[];
  totalPages: number;
}

export const paginate = <T>(
  items: T[],
  page: number,
  limit: number,
): PaginateResult<T> => {
  const totalPages = Math.max(1, Math.ceil(items.length / limit));
  const start = (page - 1) * limit;
  const paginatedItems = items.slice(start, start + limit);

  return {
    totalPages,
    paginatedItems,
  };
};
