export default function getCookie(key: string) {
  if (typeof document === "undefined") return "";
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop()! : "";
}
