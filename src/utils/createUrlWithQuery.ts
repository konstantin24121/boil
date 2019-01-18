export function createUrlWithQuery(
  url: string,
  queryParams: Record<string, any>,
): string {
  const queryString = Object.keys(queryParams)
    .map((key) => {
      return (
        encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key])
      );
    })
    .join('&');

  return `${url}?${queryString}`;
}
