export default function getParamsUrl() {
  if (typeof window === "undefined") return {};
  const urlParams = new URLSearchParams(window.location.search);
  const queryParams: Record<string, string> = {};
  for (const [key, value] of urlParams) {
    queryParams[key] = value;
  }
  return queryParams;
}
