export function truncateText(
  text: string | undefined | null,
  maxLength: number = 50,
  ellipsis: string = "..."
): string {
  if (!text) return "";

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
}