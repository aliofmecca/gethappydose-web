import { Fragment, type ReactNode } from "react";

/**
 * Parses inline emphasis markers in a string and renders them as semantic tags:
 *   *italic*    → <em>
 *   _underline_ → <u>
 *
 * Everything else stays plain text. No nesting, no escape.
 * Keep the markup convention minimal on purpose — strings.ts stays readable.
 *
 * Usage: <p>{renderEmphasis(strings.absorption.body)}</p>
 */
export function renderEmphasis(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*|_[^_]+_)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("_") && part.endsWith("_") && part.length > 2) {
      return <u key={i}>{part.slice(1, -1)}</u>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
