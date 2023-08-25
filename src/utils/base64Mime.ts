export default function base64MimeType(encoded: string) {
  let result: string | null = null;

  if (typeof encoded !== "string") {
    return result;
  }

  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1] ?? null;
  }

  return result;
}
