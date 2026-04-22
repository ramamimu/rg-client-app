import type { Timestamp } from "firebase/firestore";

export function toDate(
  value: Timestamp | Date | null | undefined,
): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof (value as Timestamp).toDate === "function") {
    return (value as Timestamp).toDate();
  }
  return null;
}

export function formatTimestamp(
  value: Timestamp | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions,
  locale = "id-ID",
): string {
  const date = toDate(value);
  if (!date) return "-";
  return date.toLocaleDateString(
    locale,
    options ?? {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
}

export function formatDateForInput(
  value: Timestamp | Date | null | undefined,
): string {
  const date = toDate(value);
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateTimeForInput(
  value: Timestamp | Date | null | undefined,
): string {
  const date = toDate(value);
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatTimeForInput(
  value: Timestamp | Date | null | undefined,
): string {
  const date = toDate(value);
  if (!date) return "";
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
