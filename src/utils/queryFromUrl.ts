export const getQueryFromUrl = (s: string): Record<string, string> => {
  const query: Record<string, string> = {};
  const params = s.split("?")[1]?.split("&") ?? [];
  params.forEach((param) => {
    const dparam = param.split("=");
    query[dparam[0]!] = dparam[1]!;
  });
  return query;
};
