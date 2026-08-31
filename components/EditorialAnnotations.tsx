"use client";

import { useState } from "react";

type Annotation = {
  word: string;
  note: string;
};

export function EditorialAnnotations({
  ariaLabel,
  items,
}: {
  ariaLabel: string;
  items: Annotation[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const noteId = `${ariaLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-note`;
  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <div
      aria-label={ariaLabel}
      className={`editorial-annotations${activeItem ? " has-note" : ""}`}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActiveIndex(null);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setActiveIndex(null);
      }}
      role="group"
    >
      <div className="editorial-annotations__words">
        {items.map((item, index) => (
          <button
            aria-controls={noteId}
            aria-expanded={activeIndex === index}
            className={activeIndex === index ? "is-active" : ""}
            key={item.word}
            onClick={() => {
              setActiveIndex((current) => (current === index ? null : index));
            }}
            onFocus={() => setActiveIndex(index)}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActiveIndex(index);
            }}
            type="button"
          >
            {item.word}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="editorial-annotations__note" id={noteId}>
        {activeItem ? (
          <>
            <span>EDITOR&apos;S NOTE /</span> {activeItem.note}
          </>
        ) : (
          <span aria-hidden="true">HOVER, FOCUS OR TAP A WORD</span>
        )}
      </p>
    </div>
  );
}
