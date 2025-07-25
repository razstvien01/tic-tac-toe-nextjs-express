import { format } from "date-fns";

/**
 * Formats a Date or string into a readable format: "MMM dd, yyyy – hh:mm a"
 * Example: "Jul 24, 2025 – 05:30 PM"
 */
export function formatDate(date: string | Date): string {
  return format(
    typeof date === "string" ? new Date(date) : date,
    "MMM dd, yyyy - hh:mm a"
  );
}
